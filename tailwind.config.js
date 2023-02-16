/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
            "./views/*{html,js}",
            "./views/partials/*{html,js}",
            "./node_modules/flowbite/**/*.js",
            'node_modules/preline/dist/*.js',
          ],
  theme: {
    extend: {
      colors:{
        'mainColor':"#1C7A41",
        'hoverColor':"#fff97a",
        'hoverblockColor':"#EFFDFDA6",
        'sectionBgColor' :"#15582F"
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('preline/plugin'),
  ],
}
