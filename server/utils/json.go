package utils

import (
	"bytes"
	"encoding/json"
)

func StructToJSON(data interface{}) ([]byte, error) {
	buf := new(bytes.Buffer)

	if err := json.NewEncoder(buf).Encode(data); err != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}
