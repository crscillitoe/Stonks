#! /bin/sh

PROTOC_GEN_TS_PATH="../typescript/node_modules/.bin/protoc-gen-ts"
TS_OUT="../typescript/types"
GO_OUT="../golang/types"
PYTHON_OUT="../python/types"
C_SHARP_OUT="../csharp/types"
GRPC_TOOLS_NODE_PROTOC_PLUGIN="../typescript/node_modules/.bin/grpc_tools_node_protoc_plugin"
GRPC_TOOLS_NODE_PROTOC="../typescript/node_modules/.bin/grpc_tools_node_protoc"

protoc \
    -I=. \
    --go_out=${GO_OUT} \
    --plugin=protoc-gen-grpc="${GRPC_TOOLS_NODE_PROTOC_PLUGIN}" \
    --plugin=protoc-gen-ts="${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs:${TS_OUT}" \
    --ts_out="${TS_OUT}" \
    --grpc_out="${TS_OUT}" \
    --python_out="${PYTHON_OUT}" \
    --csharp_out="${C_SHARP_OUT}" \
    --go-grpc_out="${GO_OUT}" \
    trading/*.proto \
    apis/*.proto