Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'pages/test', to: 'pages#test'
  resources :themes do
    resources :text, only: %i[index show new create edit]
  end
  resources :text, only: %i[destroy update]
end
