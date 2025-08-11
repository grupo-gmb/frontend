import axios from 'axios';

export const getApiErrorMessage = (error: unknown): string => {
    //Verifica se é um erro do Axios
    if(axios.isAxiosError(error)){
        //verifica se há uma resposta da API com uma mensagem de erro
        if(error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message)
            return error.response.data.message;
        }
        //Se não houver uma mensagem especifica, deve retornar o status do erro
        if(error.response){
            return `Erro: ${error.response.status } - ${error.response.statusText}`
        }
    }

    //Se for um erro genérido co JS
    if(error instanceof Error){
        return error.message
    }
    return 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
}