const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10

    class Juego {
      constructor() {
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500);
      }

      inicializar() {
        this.siguienteNivel=this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1;
        this.colores = {
          celeste,
          violeta,
          naranja,
          verde
        }
      }

      toggleBtnEmpezar(){
        if(btnEmpezar.classList.contains('hide')){
          btnEmpezar.classList.remove('hide')
        }else{
          btnEmpezar.classList.add('hide')
        }
      }

      generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4))
      }

      siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventoClick()
      }

      transformarColorNumero(color){
        switch (color){
          case 'celeste':
            return 0
          case 'violeta':
            return 1
          case 'naranja':
            return 2
          case 'verde':
            return 3
        }
      }


      transformarNumeroColor(numero){
        switch (numero){
          case 0:
            return 'celeste'
          case 1:
            return 'violeta'
          case 2:
            return 'naranja'
          case 3:
            return 'verde'
        }
      }

      apagarColor(color){
        this.colores[color].classList.remove('light')
      }

      agregarEventoClick(){
        this.colores.celeste.addEventListener('click',this.elegirColor)
        this.colores.violeta.addEventListener('click',this.elegirColor)
        this.colores.naranja.addEventListener('click',this.elegirColor)
        this.colores.verde.addEventListener('click',this.elegirColor)
      }
      eliminarEventoClick(){
        this.colores.celeste.removeEventListener('click',this.elegirColor)
        this.colores.violeta.removeEventListener('click',this.elegirColor)
        this.colores.naranja.removeEventListener('click',this.elegirColor)
        this.colores.verde.removeEventListener('click',this.elegirColor)
      }

      elegirColor(ev){
        console.log(ev);
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorNumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]){
          this.subnivel++
          if(this.subnivel === this.nivel){
            this.nivel++
            this.eliminarEventoClick()
            if(this.nivel === (ULTIMO_NIVEL +1)){
              this.ganoJuego()
            }else{
              setTimeout(this.siguienteNivel,1500)
            }
          }
        }else{
          this.perdioJuego()
        }

      }

      ganoJuego(){
        swal('GANASTE','Te la rifaste Fernando.',{button:'Jugar de nuevo'})
        .then(()=>{
          this.eliminarEventoClick()
          this.inicializar().bind(this)
        })
      }

      perdioJuego(){
        swal('PERDISTE','JAJAJAJAJA todo menso.')
        .then(()=>{
          this.eliminarEventoClick()
          this.inicializar().bind(this)
        })
      }


      iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color),350)
      }

      iluminarSecuencia(){
        for(let i = 0; i < this.nivel; i++){
          const color = this.transformarNumeroColor(this.secuencia[i])
          setTimeout(() => this.iluminarColor(color), 1000*i)
        }
      }
    }

    function empezarJuego() {
      window.juego = new Juego()
    }
