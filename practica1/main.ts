const arr = [[1,4],"2",3];

const toNumbers = (comodin: Array<any>): Array<number> => {
    try {
        let miArray: Array<number> = [];
        let arr: Array<any>;
        let num = 0;
        arr = comodin.flat(Number.MAX_VALUE); //coge el valor max 
        for (let i = 0; i < arr.length; i++) {
            if (typeof arr.at(i) === "number") {
                num = arr.at(i);
                miArray.push(num);
            }
            if (typeof arr.at(i) === "string") {
                num = Number(arr.at(i));
                miArray.push(num);
            }
        }
        return miArray;
    } catch (error) {
        console.log(error)
      return []
    }    
}
export const toMultiply = (entro: Array<any>): Array<number> => {
    try {
    let salgo: Array<number> = [];
    salgo = toNumbers(entro);
    return salgo.map((_,index:number) => {
        return salgo.reduce((acc:number, elemA:number, indexA: number) => {
          if(index !== indexA) {
            return (elemA * acc);
          }
          else {
            return acc;
          }
        },1)
    })
} catch (error) {
    console.log(error)
    return []
}
}
console.log(toMultiply(arr));

