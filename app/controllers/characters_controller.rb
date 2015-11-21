class CharactersController < ApplicationController
	before_action :set_character, only: [:show, :edit, :update, :destroy]
	def index
		@characters = Character.where(user_id: current_user.id )
		respond_to do |format|
			if(!user_signed_in?)
				format.html { redirect_to root_path, notice: "Please add a character"}
			else
				format.html { render :index, notice: "Characters" }
				format.js
			end
		end
	end

	def show
		@characters = Character.where(user_id: current_user.id) 
		respond_to do |format|
			format.html { render :show }
			format.js {}
		end	
	end

	def new
		@character = Character.new
		respond_to do |format|
			format.html { render :new }
			format.js {}
		end	
	end

	def edit
		respond_to do |format|
			format.html { render :edit }
			format.js {}
		end	
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

	def destroy
    @character.destroy
    respond_to do |format|
      format.html { redirect_to root_path, notice: 'Character was successfully deleted.' }
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
