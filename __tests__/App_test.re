open Jest;

describe("Expect", () => {
  ReactTestingLibrary.(
    Expect.(
      test("it renders", () =>
        render(<App />) |> container |> expect |> toMatchSnapshot
      )
    )
  )
});
