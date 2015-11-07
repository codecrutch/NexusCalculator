require 'test_helper'

class CavesControllerTest < ActionController::TestCase
  setup do
    @cave = caves(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:caves)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create cave" do
    assert_difference('Cave.count') do
      post :create, cave: { boss: @cave.boss, cavename: @cave.cavename, coordinates: @cave.coordinates, creatures: @cave.creatures, drops: @cave.drops, requirements: @cave.requirements }
    end

    assert_redirected_to cave_path(assigns(:cave))
  end

  test "should show cave" do
    get :show, id: @cave
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @cave
    assert_response :success
  end

  test "should update cave" do
    patch :update, id: @cave, cave: { boss: @cave.boss, cavename: @cave.cavename, coordinates: @cave.coordinates, creatures: @cave.creatures, drops: @cave.drops, requirements: @cave.requirements }
    assert_redirected_to cave_path(assigns(:cave))
  end

  test "should destroy cave" do
    assert_difference('Cave.count', -1) do
      delete :destroy, id: @cave
    end

    assert_redirected_to caves_path
  end
end
