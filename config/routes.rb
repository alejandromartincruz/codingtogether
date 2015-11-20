Rails.application.routes.draw do
  resources :locations
  resources :events
  devise_for :users, path: '',
  					 path_names: { sign_in: 'login', sign_up: 'register'}

  root to: 'users#index'
  
end
