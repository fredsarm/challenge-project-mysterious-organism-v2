// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (num, arrBases) => {
  return {
    specimenNum: num,
    dna: arrBases,
    mutate (){
      let mutDNA = this.dna; //dna from this object for processing
      let randId = Math.floor(Math.random() * mutDNA.length); //random index for the dna array
      let valRandId = mutDNA[randId]; // value in the index array
      let newValRandId; // new value tha will be update.
      let baseList =  ['A','G','C','T']; // list of possibilities of bases
      for (let i = 0 ; i < baseList.length ; i++) {
        if (valRandId !== baseList[i]) {
          newValRandId = baseList[i];
          mutDNA[randId] = newValRandId; 
         break;
        }
      }
      return {
        specimenNum: this.specimenNum,
        dna: mutDNA,
        mutate: this.mutate,
        compareDNA: this.compareDNA,
        willLikelySurvive: this.willLikelySurvive,
        complementStrand: this.complementStrand
      }
    },
    compareDNA(pAequor) {
      let basesInCommon = 0;
      let percentualInCommon;
      for (let i = 0 ; i < this.dna.length ; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          basesInCommon = basesInCommon + 1; 
        }
      };
      percentualInCommon = basesInCommon / 15 * 100;
      console.log (`specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${percentualInCommon.toFixed(2)} % DNA in common`);
    },
    willLikelySurvive(){
      let goodBases = 0;
      let oddsOnSurvive; 
      for (let i = 0 ; i < this.dna.length ; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          goodBases++; 
        }
      };
      oddsOnSurvive = goodBases / 15 * 100;
      return (oddsOnSurvive >= 60)
    },
    complementStrand(){
      let complementBases = [];
      this.dna.forEach(base => {
        switch (base) {
          case 'A':
            complementBases.push('T');
            break;
          case 'T':
            complementBases.push('A');
            break;
          case 'G':
            complementBases.push('C');
            break;
          case 'C':
            complementBases.push('G');
            break;
          }
        })
      return complementBases;
    }
  }
};

const create30Instances = () => {
  let instances = [];
  for (let i = 1 ; i < 31 ; i++) {
    instances.push(pAequorFactory(i,mockUpStrand()));
  }
  return instances;
}
let required30Instances = create30Instances();



//////////////////  Tests  ///////////////////////////////

let specimen1 = pAequorFactory(1,mockUpStrand());
let specimen2 = pAequorFactory(2,mockUpStrand());
console.log('specimen1 original');
console.log(specimen1);
console.log('specimen2 original');
console.log(specimen2);
specimen1 = specimen1.mutate();
console.log('\n\n\nspecimen1 mutation ocurred with the mutate original');
console.log(specimen1);
specimen1 = specimen1.mutate();
console.log('\n\n\nspecimen1 mutation ocurred with the mutate of the object mutated');
console.log(specimen1);
specimen1.compareDNA(specimen2);

console.log('============================================')
console.log('Will Likely Survive?')
console.log(specimen1.willLikelySurvive());
console.log('============================================')
console.log('Complement Strand')
console.log(specimen1.dna);
console.log(specimen1.complementStrand());
console.log('============================================')


//console.log(required30Instances);
