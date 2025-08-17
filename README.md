# SwiftFormat

SwiftFormat is a powerful online tool that helps you convert various file formats quickly and efficiently. Built with modern web technologies, it offers a seamless experience for file format conversion and processing.

## Features

- 🚀 **Fast Processing**: Quick and efficient file format conversions
- 🎨 **Multiple Formats**: Support for various file types including images, documents, and more
- 🔒 **Secure**: Local processing ensures your data remains private
- 📱 **Responsive Design**: Works seamlessly across all devices
- 🌐 **Modern UI**: Clean and intuitive user interface built with React and Tailwind CSS

## Tech Stack

- **Frontend**:
  - React 18
  - TypeScript
  - Tailwind CSS
  - Vite
  - Radix UI Components
  - React Query

- **Backend**:
  - Node.js
  - Express
  - TypeScript
  - Drizzle ORM
  - NeonDB (PostgreSQL)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/archduke1337/Swift.git
   cd Swift
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL=your_database_url
   SESSION_SECRET=your_session_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Deployment

This project is configured for deployment on Vercel:

1. Push your changes to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy your changes

## Project Structure

```
Swift/
├── api/            # Backend API code
├── client/         # Frontend React application
│   ├── public/     # Static assets
│   └── src/        # React source files
├── shared/         # Shared types and utilities
└── ... config files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find SwiftFormat useful, consider supporting the project with a donation. Your support helps maintain and improve the tool for everyone.

---

Made with ❤️ by Archduke1337
