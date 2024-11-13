'use server'
import { PrismaClient } from "@prisma/client";
import { CreateConstrutoraDto } from "../dto/createconstrutora.dto";



const prisma = new PrismaClient();

export default async function CreateConstrutora(_: any, data: FormData) {

    const cnpj = data.get("cnpj") as string;
    const razaoSocial = data.get("razaosocial") as string;
    const tel = data.get("telefone") as string;
    const email = data.get("email") as string;
    const fantasia = data.get("fantasia") as string;
    const financeiro = '[]'
    const atividade = 'CONST'

    const dto = new CreateConstrutoraDto(cnpj, razaoSocial, tel, email, fantasia);
    const erroValidacao = dto.validar();
    if(erroValidacao){
        return { error: true, message: erroValidacao, data: null }
    }

    if (await prisma.nato_empresas.findFirst({ where: { cnpj } })) {
        return { error: true, message: "CNPJ já cadastrado", data: null };
    }
try{
    await prisma.nato_empresas.create({
         data:{
             cnpj: cnpj,
             razaosocial: razaoSocial,
             tel: tel,
             email: email,
             fantasia: fantasia,
             financeiro: financeiro,
             atividade: atividade,
             status: true
         }
     });

     return { error: false, message: "Construtora cadastrada com sucesso", data: null };    
}catch(err){
    return { error: true, message: "Erro ao cadastrar construtora", data: err };
}finally{
    await prisma.$disconnect();
}
    


}
