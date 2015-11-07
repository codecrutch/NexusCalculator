require 'test_helper'

class CreaturesControllerTest < ActionController::TestCase
  setup do
    @creature = creatures(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:creatures)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create creature" do
    assert_difference('Creature.count') do
      post :create, creature: { ac: @creature.ac, cave_id: @creature.cave_id, creaturename: @creature.creaturename, vita: @creature.vita }
    end

    assert_redirected_to creature_path(assigns(:creature))
  end

  test "should show creature" do
    get :show, id: @creature
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @creature
    assert_response :success
  end

  test "should update creature" do
    patch :update, id: @creature, creature: { ac: @creature.ac, cave_id: @creature.cave_id, creaturename: @creature.creaturename, vita: @creature.vita }
    assert_redirected_to creature_path(assigns(:creature))
  end

  test "should destroy creature" do
    assert_difference('Creature.count', -1) do
      delete :destroy, id: @creature
    end

    assert_redirected_to creatures_path
  end
end
