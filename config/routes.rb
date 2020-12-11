Rails.application.routes.draw do
  get 'texts/new'
  post 'texts/create'
  get 'texts/show'
  get 'texts/index'
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
