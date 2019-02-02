defmodule Api.Router do
  use Plug.Router

  defp json(data) do
    data
      |> Enum.to_list
      |> Poison.encode!
  end

  plug(:match)
  plug(:dispatch)

  get "/" do
    data = Mongo.find(:mongo, "posts", %{}, limit: 5, pool: DBConnection.Poolboy)
      |> json

    send_resp(conn, 200, data)
  end


  match(_, do: send_resp(conn, 404, "Oops!"))
end
