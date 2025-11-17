# Real-Time Chat Application

A modern, real-time chat application built with Next.js 16, React 19, Supabase, and TypeScript. Features secure authentication, real-time messaging with presence indicators, and infinite scroll message history.

## Features

- **Real-time messaging** - Instant message delivery using Supabase Realtime with broadcast channels
- **Online presence** - See who's currently active in each chat room
- **OAuth authentication** - Secure user authentication via Supabase Auth
- **Private chat rooms** - Create and invite users to private rooms
- **Infinite scroll** - Efficient message loading with intersection observer
- **Row Level Security** - Database-level access control for all data
- **Dark mode** - Built-in dark theme support
- **Type-safe** - Full TypeScript support with auto-generated database types

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui, Radix UI
- **Backend**: Supabase (Auth, Database, Realtime)
- **Form Validation**: Zod + React Hook Form
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 20+
- A Supabase project ([create one here](https://supabase.com))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd real-chat
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=your_anon_key
SUPABASE_SECRET_KEY=your_service_role_key
```

4. Run database migrations:

```bash
# Link to your Supabase project (one-time setup)
npx supabase link --project-ref your-project-ref

# Push migrations to your database
npx supabase db push
```

5. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Generate TypeScript types from Supabase schema
npm run gen-types
```

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── auth/                # Authentication pages
│   └── rooms/               # Chat room pages
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── chat-input.tsx       # Message input component
│   ├── chat-message.tsx     # Message display component
│   └── invite-user-modal.tsx # User invitation modal
├── lib/                     # Utilities and configurations
│   ├── middleware.ts        # Auth middleware
│   └── server.ts            # Server-side Supabase client
└── services/
    └── supabase/
        ├── actions/         # Server Actions
        ├── schemas/         # Zod validation schemas
        ├── types/           # Generated TypeScript types
        └── client.ts        # Client-side Supabase client
```

## How It Works

### Real-time Architecture

The application uses Supabase Realtime with a three-part architecture:

1. **Client Subscriptions**: Users subscribe to private channels (`room:${roomId}:messages`) for their chat rooms
2. **Database Triggers**: When a message is inserted, a PostgreSQL trigger automatically broadcasts it to the appropriate Realtime channel
3. **Row Level Security**: RLS policies ensure users can only access messages from rooms they're members of

### Authentication Flow

1. Users authenticate via OAuth (configured in Supabase)
2. OAuth callback exchanges code for session
3. Middleware protects all routes except `/auth/*` and `/login`
4. User profiles are automatically created via database trigger

### Database Schema

- `user_profile` - User information (auto-created on signup)
- `chat_room` - Chat rooms with privacy settings
- `chat_room_member` - Room membership junction table
- `messages` - Chat messages with author and room references

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
