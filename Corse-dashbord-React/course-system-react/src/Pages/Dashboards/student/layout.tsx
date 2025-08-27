// import type React from "react"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import { ThemeProvider } from "@mui/material/styles"
// import CssBaseline from "@mui/material/CssBaseline"
// import { createTheme } from "@mui/material/styles"
// import "../../globals.css" // Import globals.css at the top of the file

// const inter = Inter({ subsets: ["latin"] })

// const theme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#90caf9",
//     },
//     secondary: {
//       main: "#ce93d8",
//     },
//     background: {
//       default: "#0a0a0a",
//       paper: "#1a1a1a",
//     },
//     text: {
//       primary: "#ffffff",
//       secondary: "#b0b0b0",
//     },
//   },
//   typography: {
//     fontFamily: inter.style.fontFamily,
//     h4: {
//       fontWeight: 700,
//     },
//     h6: {
//       fontWeight: 600,
//     },
//   },
//   components: {
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: 12,
//           backgroundColor: "#1e1e1e",
//           border: "1px solid #333",
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: 12,
//           backgroundColor: "#1e1e1e",
//         },
//       },
//     },
//     MuiChip: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "#333",
//           color: "#fff",
//         },
//       },
//     },
//   },
// })

// export const metadata: Metadata = {
//   title: "Student Information",
//   description: "Student academic information dashboard",
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <ThemeProvider theme={theme}>
//           <CssBaseline />
//           {children}
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }
