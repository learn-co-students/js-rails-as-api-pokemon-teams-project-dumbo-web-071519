class PokemonsController < ApplicationController
    def show
        poke = Pokemon.find_by(id:params[:id])
        render json: PokemonSerializer.new(poke)
    end

    def create
        poke = Pokemon.new_pokemon(params[:trainer_id])
        options = {
            include: [:trainer]
        }
        render json: PokemonSerializer.new(poke, options)
    end
    
    def destroy 
        poke = Pokemon.find_by(id: params[:id])
        poke.destroy();
        render json: {message: "#{poke.nickname} was deleted"}
    end
end
