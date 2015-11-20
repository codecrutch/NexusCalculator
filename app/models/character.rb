class Character < ActiveRecord::Base
	validates :name, :vita, :mana, :path, :might, :will, :grace, :user_id, :alignment, presence: true
	validates :vita, :mana, :might, :will, :grace, numericality: true
	belongs_to :user
end
