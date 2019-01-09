defmodule Api do
  import Plug.Conn

  @moduledoc """
  Documentation for Api.
  """

  def init(options), do: options

  @doc """
  Hello world.

  ## Examples

      iex> Api.hello()
      :world

  """
  def call(conn, _opts) do
    conn
    |> put_resp_content_type("text/plain")
    |> send_resp(200, "Hello World!\n")
  end
end
