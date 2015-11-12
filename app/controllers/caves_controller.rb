class CavesController < ApplicationController
  before_action :set_cave, only: [:show, :edit, :update, :destroy]

  # GET /caves
  # GET /caves.json
  def index
      @caves = Cave.all
  end

  # GET /caves/1
  # GET /caves/1.json
  def show
  end

  # GET /caves/new
  def new
    @cave = Cave.new
  end

  # GET /caves/1/edit
  def edit
  end

  def test
    @cave = Cave.find(params[:cave_id])

    respond_to do |format|
      format.html { redirect_to @cave }
      format.js
    end
  end

  # POST /caves
  # POST /caves.json
  def create
    @cave = Cave.new(cave_params)

    respond_to do |format|
      if @cave.save
        format.html { redirect_to @cave, notice: 'Cave was successfully created.' }
        format.json { render :show, status: :created, location: @cave }
      else
        format.html { render :new }
        format.json { render json: @cave.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /caves/1
  # PATCH/PUT /caves/1.json
  def update
    respond_to do |format|
      if @cave.update(cave_params)
        format.html { redirect_to @cave, notice: 'Cave was successfully updated.' }
        format.json { render :show, status: :ok, location: @cave }
      else
        format.html { render :edit }
        format.json { render json: @cave.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /caves/1
  # DELETE /caves/1.json
  def destroy
    @cave.destroy
    respond_to do |format|
      format.html { redirect_to caves_url, notice: 'Cave was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cave
      @cave = Cave.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def cave_params
      params.require(:cave).permit(:cavename, :id, :some_parameter, :requirements, :coordinates, :boss, :drops)
    end
end
