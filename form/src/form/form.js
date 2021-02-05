import { InputLabel, Select } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'

const Form = () => (
  <>
    <h1>create product</h1>
    <form>
      <TextField label="name" id="name"/>
      <TextField label="size" id="size"/>

    <InputLabel htmlFor="type">Type</InputLabel>

      <Select
        native
        value=""
        inputProps={{
          name: "type",
          id: "type",
        }}
        >
          <option aria-label="None" value="" />
          <option value="electronic">electronic</option>
          <option value="furniture">furniture</option>
          <option value="clothing">clothing</option>
        </Select>
    </form>
  </>
)

export default Form
