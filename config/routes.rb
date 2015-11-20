Rails.application.routes.draw do
  resources :locations
  resources :events
  devise_for :users

  get '/' => 'users#index'
  
end
