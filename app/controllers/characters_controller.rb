class CharactersController < ApplicationController
	before_action :set_character, only: [:show, :edit, :update]
	def index
		if !(user_signed_in?)
			redirect_to :new_user_session
		end
		@characters = Character.where(user_id: current_user.id )
	end

	def show
		@characters = Character.where(user_id: current_user.id) 
	end

	def new
		@character = Character.new
	end

	def edit
	end

	def create
		@character = Character.new(character_params)

		respond_to do |format|
			if @character.save
				format.html { redirect_to @character, notice: @character.name + " was created successfuly."}
			else
				format.html { render :new }
			end
		end
	end

	def update
		respond_to do |format|
			if @character.update(character_params)
				format.html { redirect_to @character, notice: @character.name + " was updated!"}
			else
				format.html { render :edit}
			end
		end
	end

	private

	def character_params
		params.require(:character).permit(:name, :mana, :vita, :path, :alignment, :user_id, :might, :will, :grace,
		 :imagelocation, :subpath, :clan, :clantitle, :title)
	end

	def set_character
		@character = Character.find(params[:id]);
	end

end
