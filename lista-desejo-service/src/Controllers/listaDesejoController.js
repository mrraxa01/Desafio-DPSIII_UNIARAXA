const listaDesejos = require('../Models/listaDesejos');
const listadedesejoRepository = require('../Repositories/listaDesejoRepository');

module.exports = {
    async create(request, response) {
        try {
            const { nomeLista, _idParticipante , itens } = request.body;
            const newList = new listaDesejos({ nomeLista, _idParticipante, itens });
            const listSaved = await newList.save();
            
            return response.json({
                mensagem: "Lista criada com sucesso",
                status: 200,
                lista: listSaved
            });
        } catch (error) {
            return response.status(500).json({
                mensagem: "Erro ao criar uma nova lista!",
                status: 500,
                error: error.message
            });
        }
    },
    async edit(request, response) {
        try {
            const UpdatedList = await listadedesejoRepository.edit(request.body);
            return response.json({
                mensagem: "Lista editada com sucesso!",
                status: 200,
                lista: UpdatedList
            });
        } catch (error) {
            return response.status(500).json({
                mensagem: "Erro ao editar a lista de desejos! ",
                status: 500,
                error: error.message
            });
        }
    },
    async delete (request, response){
        let { id }  = request.params;
        const listaDesejos = await listadedesejoRepository.delete(id);
        return response.json({
            "mensagem" : "Lista removida com sucesso!",
            "status" : 200
        }); 
    },
    async getById (request, response){
        let { id }  = request.params;
        let listaDesejos =  await listadedesejoRepository.getById(id);
        
        if (listaDesejos === null) {
            response.status(404);           
            return  response.json({
                "mensagem" : "Lista não encontrada!",
                "status" : 404,
                "Lista" : listaDesejos            
            });         
        }
        return response.json({
            "mensagem" : "Lista encontrada com sucesso!",
            "status" : 200,
            "Lista" : listaDesejos            
        }); 

    },
    async addItemNaListaDeDesejos(request, response) {
        try {
            const { id } = request.params;
            const { nomeItem, descricaoItem } = request.body;
    
            const UdatedList = await listadedesejoRepository.addItemNaListaDeDesejos(id, { nomeItem, descricaoItem });
    
            if (!UdatedList) {
                return response.status(404).json({
                    mensagem: "Lista de desejos não encontrada",
                    status: 404
                });
            }

            return response.json({
                mensagem: "Item adicionado na lista!",
                status: 200,
                lista: UdatedList
            });
        } catch (error) {
            return response.status(500).json({
                mensagem: "Erro ao adicionar item na lista!",
                status: 500,
                error: error.message
            });
        }
    },
    async deleteItemDaListaDeDesejos(request, response) {
        try {
            const { idLista, idItem } = request.params;
            const UdatedList = await listadedesejoRepository.deleteItemDaListaDeDesejos(idLista, idItem);
            return response.json({
                mensagem: "Item removido da lista!",
                status: 200,
                lista: UdatedList
            });
        } catch (error) {
            return response.status(500).json({
                mensagem: "Erro ao excluir item da lista!",
                status: 500,
                error: error.message
            });
        }
    },
    async getListasByParticipanteId (request, response){
        try {
            const { participanteId } = request.params;
            const listaDesejos = await listadedesejoRepository.getListasByParticipanteId(participanteId);
            return response.json({
                "mensagem": "Lista encontrada com sucesso!",
                "status": 200,
                "Lista": listaDesejos
            });
        } catch (error) {
            return response.json({
                "mensagem": "Erro " + error,
                "status": 500,
                "Lista": null
            });
        }
    },
    async getAll(request, response) {
        try {
            const listas = await listadedesejoRepository.getAll();
            return response.json({
                "mensagem": "Listas encontradas com sucesso!",
                "status": 200,
                "listas": listas
            });
        } catch (error) {
            return response.json({
                "mensagem": "Erro " + error,
                "status": 500,
                "listas": null
            });
        }
    }
}