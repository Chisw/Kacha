const base = {
  '4': '1rem',
  '6': '1.5rem',
  '8': '2rem',
  '12': '3rem',
  '16': '4rem',
  '24': '6rem',
  '32': '8rem',
  '40': '10rem',
  '48': '12rem',
  '56': '14rem',
  '64': '16rem',
}

const extra = {
  '72': '18rem',
  '80': '20rem',
  '88': '22rem',
  '96': '24rem',
  '104': '26rem',
  '112': '28rem',
  '120': '30rem',
  '128': '32rem',
  '136': '34rem',
  '144': '36rem',
  '152': '38rem',
  '160': '40rem',
}

const percent = {
  '1/2': '50%',
  '1/3': '33.33%',
  '2/3': '66.66%',
  '1/4': '25%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  'full': '100%',
}

module.exports = {
  purge: [
    './src/**/*.tsx',
  ],
  future: {
    removeDeprecatedGapUtilities: true,
  },
  theme: {
    extend: {
      inset: Object.assign({

      }, percent),
      spacing: Object.assign({

      }, base, extra),
      width: Object.assign({

      }, extra),
      height: Object.assign({

      }, percent, extra),
      minWidth: Object.assign({

      }, base, extra, percent),
      minHeight: Object.assign({

      }, base, extra, percent),
      maxWidth: Object.assign({

      }, base, extra, percent),
      maxHeight: Object.assign({

      }, base, extra, percent),
      borderRadius: {

      },
      backgroundColor: {
        'white-10': 'rgba(255, 255, 255, .01)',
        'white-20': 'rgba(255, 255, 255, .02)',
        'white-30': 'rgba(255, 255, 255, .03)',
        'white-40': 'rgba(255, 255, 255, .04)',
        'white-50': 'rgba(255, 255, 255, .05)',
        'white-100': 'rgba(255, 255, 255, .1)',
        'white-200': 'rgba(255, 255, 255, .2)',
        'white-300': 'rgba(255, 255, 255, .3)',
        'white-400': 'rgba(255, 255, 255, .4)',
        'white-500': 'rgba(255, 255, 255, .5)',
        'white-600': 'rgba(255, 255, 255, .6)',
        'white-700': 'rgba(255, 255, 255, .7)',
        'white-800': 'rgba(255, 255, 255, .8)',
        'white-900': 'rgba(255, 255, 255, .9)',
        'white-950': 'rgba(255, 255, 255, .95)',
        'white-960': 'rgba(255, 255, 255, .96)',
        'white-970': 'rgba(255, 255, 255, .97)',
        'white-980': 'rgba(255, 255, 255, .98)',
        'white-990': 'rgba(255, 255, 255, .99)',
        'black-10': 'rgba(0, 0, 0, .01)',
        'black-20': 'rgba(0, 0, 0, .02)',
        'black-30': 'rgba(0, 0, 0, .03)',
        'black-40': 'rgba(0, 0, 0, .04)',
        'black-50': 'rgba(0, 0, 0, .05)',
        'black-100': 'rgba(0, 0, 0, .1)',
        'black-200': 'rgba(0, 0, 0, .2)',
        'black-300': 'rgba(0, 0, 0, .3)',
        'black-400': 'rgba(0, 0, 0, .4)',
        'black-500': 'rgba(0, 0, 0, .5)',
        'black-600': 'rgba(0, 0, 0, .6)',
        'black-700': 'rgba(0, 0, 0, .7)',
        'black-800': 'rgba(0, 0, 0, .8)',
        'black-900': 'rgba(0, 0, 0, .9)',
        'black-950': 'rgba(0, 0, 0, .95)',
        'black-960': 'rgba(0, 0, 0, .96)',
        'black-970': 'rgba(0, 0, 0, .97)',
        'black-980': 'rgba(0, 0, 0, .98)',
        'black-990': 'rgba(0, 0, 0, .99)',
      },
    },
  },
  variants: {
    backgroundColor: ['hover', 'active'],
  },
  plugins: [],
}
