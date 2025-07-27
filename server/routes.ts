import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConversionSchema, conversionSettingsSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs/promises";

// Configure multer for file uploads
const upload = multer({
  dest: '/tmp/uploads/',
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // File conversion endpoint
  app.post('/api/convert', upload.array('files'), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      const settingsJson = req.body.settings;
      
      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files provided' });
      }

      // Parse and validate settings
      let settings;
      try {
        settings = conversionSettingsSchema.parse(JSON.parse(settingsJson));
      } catch (error) {
        return res.status(400).json({ error: 'Invalid conversion settings' });
      }

      const file = files[0]; // Process first file for now
      
      // Detect original format from file extension
      const originalFormat = path.extname(file.originalname).toLowerCase().slice(1);
      
      // Create conversion record
      const conversion = await storage.createConversion({
        fileName: file.originalname,
        originalFormat,
        targetFormat: settings.outputFormat,
        settings,
      });

      // Update status to processing
      await storage.updateConversion(conversion.id, { status: 'processing' });

      try {
        // Simulate file conversion process
        const outputPath = await convertFile(file.path, settings);
        
        // Update status to completed
        await storage.updateConversion(conversion.id, { 
          status: 'completed',
          completedAt: new Date()
        });

        // Read the converted file
        const convertedFile = await fs.readFile(outputPath);
        
        // Set appropriate headers
        res.setHeader('Content-Type', getContentType(settings.outputFormat));
        res.setHeader('Content-Disposition', `attachment; filename="converted.${settings.outputFormat}"`);
        
        // Clean up temporary files
        await fs.unlink(file.path).catch(() => {});
        await fs.unlink(outputPath).catch(() => {});
        
        res.send(convertedFile);
      } catch (error) {
        await storage.updateConversion(conversion.id, { status: 'failed' });
        throw error;
      }
    } catch (error) {
      console.error('Conversion error:', error);
      res.status(500).json({ error: 'Conversion failed' });
    }
  });

  // Get conversion status
  app.get('/api/conversions/:id', async (req, res) => {
    try {
      const conversion = await storage.getConversion(req.params.id);
      if (!conversion) {
        return res.status(404).json({ error: 'Conversion not found' });
      }
      res.json(conversion);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get conversion status' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Mock file conversion function
async function convertFile(inputPath: string, settings: any): Promise<string> {
  // This is a simplified mock - in a real implementation, you would use
  // libraries like fluent-ffmpeg, sharp, pdf-lib, etc.
  
  const outputPath = `/tmp/converted_${Date.now()}.${settings.outputFormat}`;
  
  // Simulate conversion delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // For demo purposes, just copy the file with new extension
  await fs.copyFile(inputPath, outputPath);
  
  return outputPath;
}

function getContentType(format: string): string {
  const contentTypes: { [key: string]: string } = {
    'mp4': 'video/mp4',
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'pdf': 'application/pdf',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'csv': 'text/csv',
    'json': 'application/json',
    'xml': 'application/xml',
  };
  
  return contentTypes[format] || 'application/octet-stream';
}
