const ListaDesejos = require('../Models/listaDesejos');

module.exports = {
    async create(listaDesejos) {
        try {
            const { nomeLista, _idParticipante, itens } = listaDesejos;
            const newList = new ListaDesejos({ nomeLista, _idParticipante});
            newList.itens = itens.map(item => ({
                nomeItem: item.nomeItem,
                descricaoItem: item.descricaoItem
            }));
            const listaSalva = await newList.save();
            return listaSalva;
        }
        catch (error) {
            console.log("Erro " + error);
        }
        return null;
    },
    async edit(listaDesejos) {
        try {
            const { _id, itens } = listaDesejos;
            const UpdatedList = await ListaDesejos.findByIdAndUpdate(_id, { itens }, { new: true });
            return UpdatedList;
        } catch (error) {
            console.error("Erro ao editar a lista de desejos:", error);
            throw error;
        }
    },
    async getById (_id){
        try{
            const retornLista = await ListaDesejos.find({ _id }); 
            return retornLista;
        }
        catch (error) {
            console.log("Erro " + error);
        }
        return null;
    },
    async delete (_id){
        try{
            
            const retornLista = await ListaDesejos.deleteOne({ _id : _id}); 
            return retornLista;
        }
        catch (error) {
            console.log("Erro " + error);
        }
        return null;
    },
    async addItemNaListaDeDesejos(id, novoItem) {
        try {
            const UpdatedList = await ListaDesejos.findByIdAndUpdate(
                id,
                { $push: { itens: novoItem } },
                { new: true }
            );
            return UpdatedList;
        } catch (error) {
            console.error("Erro ao adicionar item à lista de desejos:", error);
            throw error;
        }
    },
    async deleteItemDaListaDeDesejos(idLista, idItem) {
        try {
            const UpdatedList = await ListaDesejos.findByIdAndUpdate(
                idLista,
                { $pull: { itens: { _id: idItem } } },
                { new: true }
            );
            return UpdatedList;
        } catch (error) {
            console.error("Erro ao excluir item da lista de desejos:", error);
            throw error;
        }
    },
    async getListasByParticipanteId(participanteId) {
        try {
            const listas = await ListaDesejos.find({ "_idParticipante": participanteId });
            const listasDetalhadas = [];

            for (const lista of listas) {
                const detalhesLista = await ListaDesejos.findById(lista._id);
                listasDetalhadas.push(detalhesLista);
            }
            console.log(listasDetalhadas);
            return listasDetalhadas;
        } catch (err) {
            console.log("Erro " + error);
            return null;
        }
    },
    async getListaDeDesejosByParticipante (idParticipante){
        try{            
            const retornLista = await Lista.find({ _idParticipante: idParticipante }); 
            return retornLista;
        }
        catch (error) {
            console.log("Erro " + error);
        }
        return null;
    },
    async getAll() {
        try {
            const Lista = await ListaDesejos.find();
            return Lista;
        } catch (error) {
            console.log("Erro " + error);
            return null;
        }
    },
    async getListaDeDesejosByParticipante(participanteId) {
        try {
            const Lista = await ListaDesejos.find({ "itens._participanteId": participanteId });
            const listaDetalhada = [];

            for (const lista of Lista) {
                const detalhesLista = await ListaDesejos.findById(grupo._id);
                listaDetalhada.push(detalhesLista);
            }
            console.log(listaDetalhada);
            return listaDetalhada;
        } catch (error) {
            console.log("Erro " + error);
            return null;
        }
    }    
}