# TimeOffer

A full-stack web application built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Prisma ORM**.  
It integrates **Clerk authentication** for secure user management and uses **Zod** for validation. UI components are powered by **Radix UI** and **shadcn/ui** with Tailwind animations.

---

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org)  
- **Frontend:** React 19, Tailwind CSS v4, Radix UI, shadcn/ui  
- **Authentication:** [Clerk](https://clerk.com)  
- **Database ORM:** [Prisma](https://www.prisma.io)  
- **Validation:** [Zod](https://zod.dev)  
- **Forms:** React Hook Form + Zod resolvers  
- **Icons & UI Enhancements:** Lucide React, Sonner (toast notifications)  
- **Styling Utilities:** class-variance-authority, clsx, tailwind-merge  

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd timeoffer
npm install
```

---

## 🛠️ Development

Run the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

```

(Add any other variables like `SVIX` webhook secret if needed.)

---

## 🗄️ Database

This project uses **Prisma**. Run migrations after setting up your database:

```bash
npx prisma migrate dev
```

Open Prisma Studio to view and edit data:

```bash
npx prisma studio
```

---

## 📐 Linting & Formatting

This project uses **ESLint** with Next.js rules and TypeScript support.

Run lint checks:

```bash
npm run lint
```

---

## 📤 Deployment

Deploy easily on [Vercel](https://vercel.com). Make sure environment variables are set in the Vercel dashboard.

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)  
- [Clerk Authentication](https://clerk.com/docs)  
- [Prisma ORM](https://www.prisma.io/docs)  
- [Tailwind CSS](https://tailwindcss.com/docs)
