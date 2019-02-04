defmodule Api.Router do
  use Plug.Router

  defp json(data) do
    data
      |> Poison.encode!
  end

  plug(:match)
  plug(:dispatch)

  get "/" do
    data = Mongo.find(:mongo, "posts", %{}, limit: 5, pool: DBConnection.Poolboy)
      |> Enum.to_list
      |> json

    send_resp(conn, 200, data)
  end

  get "/one" do
    data = Mongo.find_one(:mongo, "posts", %{}, limit: 5, pool: DBConnection.Poolboy)
      |> json

    send_resp(conn, 200, data)
  end



  match(_, do: send_resp(conn, 404, "Oops!"))
end
