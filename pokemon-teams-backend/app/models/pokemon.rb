require 'faker'
class Pokemon < ApplicationRecord
  belongs_to :trainer

  def self.new_pokemon(trainer_id)
    Pokemon.create(
      nickname: Faker::Name.first_name, 
      species: Faker::Games::Pokemon.name, 
      trainer_id: trainer_id)
  end
end
