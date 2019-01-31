defmodule Api.Application do
  @moduledoc false
  import Supervisor.Spec

  use Application
  require Logger

  def start(_type, _args) do
    import Supervisor.Spec

    children = [
      # 1. Start App
      {Plug.Cowboy, scheme: :http, plug: Api.Router, options: [port: 2000]},

      # 2. Start MongoDB
      worker(Mongo, [[name: :mongo, database: "blog", pool: DBConnection.Poolboy]])
    ]

    opts = [strategy: :one_for_one, name: Api.Supervisor]

    Logger.info("Starting application on port: 2000")

    Supervisor.start_link(children, opts)
  end

  defimpl Poison.Encoder, for: BSON.ObjectId do
    def encode(id, options) do
      BSON.ObjectId.encode!(id) |> Poison.Encoder.encode(options)
    end
  end
end
