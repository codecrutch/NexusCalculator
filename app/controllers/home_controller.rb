class HomeController < ApplicationController
	def index
		@caves = Cave.all
	end
end
