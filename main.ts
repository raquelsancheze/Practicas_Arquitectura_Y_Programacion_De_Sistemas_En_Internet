const arr = [[1,4],"2",3];

const toNumbers = (comodin: Array<any>): Array<number> => {
    let miArray: Array<number> = [];
    let arr: Array<any>;
    let num = 0;
    arr = comodin.flat();
    for (let i = 0; i < arr.length ; i++) {
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
}
const toMultiply = (entro: Array<any>): Array<number> => {
    let salgo: Array<number> = [];
    salgo = toNumbers(entro);
    return salgo.map((elem:number,index:number) => {
        return salgo.reduce((acc:number, elemA:number, indexA: number) => {
          if(index !== indexA) {
            return (elemA * acc);
          }
          else {
            return acc;
          }
        },1)
    })
}
console.log(toMultiply(arr));