import { Question } from './types';

export const CTS_QUESTIONS: Question[] = [
  {
    id: 'q1',
    situation: 'En una comunidad rural se propone la construcción de una represa para generar energía hidroeléctrica. Un grupo de científicos advierte que esto alterará el ciclo reproductivo de los peces locales.',
    question: '¿Cuál es el principal conflicto que se presenta en esta situación desde la perspectiva CTS?',
    options: [
      {
        id: 'a',
        text: 'La falta de conocimientos técnicos de los científicos sobre ingeniería civil.',
        isCorrect: false,
        explanation: 'Los científicos se enfocan en el impacto biológico, no en la técnica de construcción.'
      },
      {
        id: 'b',
        text: 'El aumento del costo de la energía para los habitantes de la región.',
        isCorrect: false,
        explanation: 'Es un factor económico, pero no el conflicto central ciencia-tecnología-ambiente.'
      },
      {
        id: 'c',
        text: 'La oposición entre el desarrollo tecnológico-económico y la conservación del ecosistema.',
        isCorrect: true,
        explanation: 'Plantea la tensión clásica entre la necesidad de infraestructura y la protección de la biodiversidad.'
      },
      {
        id: 'd',
        text: 'La falta de inversión en tecnologías alternativas más limpias.',
        isCorrect: false,
        explanation: 'Aunque es un debate válido, el conflicto principal aquí es el impacto directo de la represa en los peces.'
      }
    ]
  },
  {
    id: 'q2',
    situation: 'El uso masivo de fertilizantes nitrogenados en la agricultura ha aumentado la producción de alimentos, pero también ha causado la eutrofización de cuerpos de agua cercanos.',
    question: '¿Cuál sería una solución sostenible que aplique principios científico-tecnológicos?',
    options: [
      {
        id: 'a',
        text: 'Sustituir todos los cultivos por especies que no requieran nutrientes del suelo.',
        isCorrect: false,
        explanation: 'No es biológicamente viable para la producción de alimentos a gran escala.'
      },
      {
        id: 'b',
        text: 'Implementar sistemas de agricultura de precisión que dosifiquen el fertilizante según la necesidad del suelo.',
        isCorrect: true,
        explanation: 'Optimiza el recurso tecnológico para minimizar el desperdicio y la contaminación.'
      },
      {
        id: 'c',
        text: 'Prohibir totalmente el uso de fertilizantes químicos en el país.',
        isCorrect: false,
        explanation: 'Una prohibición radical afectaría severamente la seguridad alimentaria.'
      },
      {
        id: 'd',
        text: 'Utilizar más agua de riego para diluir el exceso de fertilizantes.',
        isCorrect: false,
        explanation: 'Esto en realidad aceleraría el transporte de nitrógeno hacia los lagos.'
      }
    ]
  },
  {
    id: 'q3',
    situation: 'Un grupo de investigadores desarrolla un plástico biodegradable a partir de almidón de yuca.',
    question: 'Para evaluar su viabilidad social, ¿qué factor debería considerarse prioritariamente?',
    options: [
      {
        id: 'a',
        text: 'Si el uso de la yuca para plásticos compite con la seguridad alimentaria de la población.',
        isCorrect: true,
        explanation: 'Es la prioridad social: evitar que la tecnología encarezca o limite el alimento básico.'
      },
      {
        id: 'b',
        text: 'La fórmula química exacta del polímero resultante.',
        isCorrect: false,
        explanation: 'Es un detalle técnico de laboratorio, no un factor de impacto social directo.'
      },
      {
        id: 'c',
        text: 'La velocidad a la que el plástico se degrada en condiciones de laboratorio.',
        isCorrect: false,
        explanation: 'Es un factor ambiental importante, pero la pregunta pide priorizar la viabilidad social.'
      },
      {
        id: 'd',
        text: 'El color y la textura final del producto para que sea atractivo al consumidor.',
        isCorrect: false,
        explanation: 'Es un interés comercial estético, no una prioridad de bienestar social.'
      }
    ]
  },
  {
    id: 'q4',
    situation: 'Se ha observado que el aumento de las temperaturas globales está expandiendo el hábitat de mosquitos transmisores de enfermedades como el Dengue.',
    question: 'Esto demuestra que:',
    options: [
      {
        id: 'a',
        text: 'La tecnología médica es insuficiente para combatir insectos.',
        isCorrect: false,
        explanation: 'El problema no es la medicina, sino las nuevas condiciones ambientales que favorecen al mosquito.'
      },
      {
        id: 'b',
        text: 'El cambio climático tiene consecuencias directas sobre la salud pública global.',
        isCorrect: true,
        explanation: 'Refleja cómo los cambios en el sistema tierra afectan directamente el bienestar humano.'
      },
      {
        id: 'c',
        text: 'Los mosquitos han desarrollado resistencia tecnológica a los insecticidas.',
        isCorrect: false,
        explanation: 'La resistencia es biológica; aquí el factor clave es el clima expandiendo el hábitat.'
      },
      {
        id: 'd',
        text: 'La ciencia no puede predecir el comportamiento de los seres vivos.',
        isCorrect: false,
        explanation: 'Al contrario, la ciencia predijo estos efectos del calentamiento global.'
      }
    ]
  },
  {
    id: 'q5',
    situation: 'En la minería de oro, el uso de mercurio permite separar el metal de la roca de forma económica, pero contamina los ríos y afecta la salud humana. Si se introduce una nueva tecnología sin mercurio pero más costosa:',
    question: '¿Qué debería hacer el Estado?',
    options: [
      {
        id: 'a',
        text: 'Subvencionar o facilitar el acceso a la nueva tecnología para proteger la salud y el ambiente.',
        isCorrect: true,
        explanation: 'Es la función del Estado: fomentar tecnologías limpias cuando el costo privado es muy alto.'
      },
      {
        id: 'b',
        text: 'Esperar a que los mineros desarrollen por sí mismos una tecnología barata.',
        isCorrect: false,
        explanation: 'La inacción estatal prolonga el daño ambiental mientras se espera una solución incierta.'
      },
      {
        id: 'c',
        text: 'Seguir permitiendo el mercurio para no afectar la economía de los mineros pobres.',
        isCorrect: false,
        explanation: 'El costo social en salud supera el beneficio económico de corto plazo.'
      },
      {
        id: 'd',
        text: 'Cerrar todas las minas de oro del país inmediatamente.',
        isCorrect: false,
        explanation: 'Es una medida radical que no gestiona la transición tecnológica necesaria.'
      }
    ]
  }
];


