import * as elements from 'typed-html';

export const HomeLayout = ({ children }: elements.Children) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://unpkg.com/htmx.org@1.9.5"></script>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@4.7.2/dist/full.min.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
      * {
        font-family: 'Inter', sans-serif;
      }
    </style>
    <title>Bun Tasks!</title>
  </head>
  <body class="h-screen w-screen flex flex-col gap-3 items-center justify-center">
    <div>
        <input type="checkbox" value="synthwave" class="toggle theme-controller"/>
    </div>
    <span class='text-xl font-semibold'>Bun Perf Testing!</span>
    ${children}
  </body>
  </html>
`;