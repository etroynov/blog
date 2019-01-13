defmodule Api.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application
  require Logger

  def start(_type, _args) do
    import Supervisor.Spec

    children = [
      {Plug.Cowboy, scheme: :http, plug: Api.Router, options: [port: 8080]},
      worker(Mongo, [[name: :mongo, database: "test", pool: DBConnection.Poolboy]])
    ]
    opts = [strategy: :one_for_one, name: Api.Supervisor]

    Logger.info("Starting application...")

    Supervisor.start_link(children, opts)
  end
end
