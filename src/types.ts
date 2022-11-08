export type Users = {
    DNI: string,
    nombre: string,
    apellidos: string,
    telefono: string,
    email: string,
    IBAN: string,
};

export type Transactions = {
    ID_Sender: number,
    ID_Receiver: number,
    amount: number,
}