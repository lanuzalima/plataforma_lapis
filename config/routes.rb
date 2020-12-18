Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'pages/test', to: 'pages#test'

  resources :annotations, only: %i[create]
  patch 'annotation/update_by_original', to: 'annotations#update_by_original'
  delete 'annotation/del_by_original', to: 'annotations#del_by_original'
  resources :texts, only: %i[edit]
  resources :themes, only: %i[new create index show edit update destroy] do
    resources :texts, only: %i[show new create]

    resources :texts, only: %i[destroy update]
  end
  get '/user/:id/texts', to: 'texts#index', as: 'user_texts'
end
