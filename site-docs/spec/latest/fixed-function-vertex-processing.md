# Fixed-Function Vertex Processing

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/fxvertex.html

## Table of Contents

- [Vertex Attributes](#fxvertex-attrib)
- [Attribute Location and Component Assignment](#fxvertex-attrib-location)
- [Attribute_Location_and_Component_Assignment](#fxvertex-attrib-location)
- [Vertex Input Description](#fxvertex-input)
- [Vertex_Input_Description](#fxvertex-input)
- [Vertex Attribute Divisor in Instanced Rendering](#fxvertex-attribute_divisor)
- [Vertex_Attribute_Divisor_in_Instanced_Rendering](#fxvertex-attribute_divisor)
- [Vertex Input Address Calculation](#fxvertex-input-address-calculation)
- [Vertex_Input_Address_Calculation](#fxvertex-input-address-calculation)
- [Vertex Input Extraction](#fxvertex-input-extraction)
- [Vertex_Input_Extraction](#fxvertex-input-extraction)

## Content

Vertex fetching is controlled via configurable state, as a logically
distinct graphics pipeline stage.

Vertex shaders **can** define input variables, which receive *vertex attribute*
data transferred from one or more `VkBuffer`(s) by drawing commands.
Vertex shader input variables are bound to buffers via an indirect binding
where the vertex shader associates a *vertex input attribute* number with
each variable, vertex input attributes are associated to *vertex input
bindings* on a per-pipeline basis, and vertex input bindings are associated
with specific buffers on a per-draw basis via the
`vkCmdBindVertexBuffers` command.
Vertex input attribute and vertex input binding descriptions also contain
format information controlling how data is extracted from buffer memory and
converted to the format expected by the vertex shader.

There are `VkPhysicalDeviceLimits`::`maxVertexInputAttributes`
number of vertex input attributes and
`VkPhysicalDeviceLimits`::`maxVertexInputBindings` number of vertex
input bindings (each referred to by zero-based indices), where there are at
least as many vertex input attributes as there are vertex input bindings.
Applications **can** store multiple vertex input attributes interleaved in a
single buffer, and use a single vertex input binding to access those
attributes.

In GLSL, vertex shaders associate input variables with a vertex input
attribute number using the `location` layout qualifier.
The `Component` layout qualifier associates components of a vertex shader
input variable with components of a vertex input attribute.

GLSL Example

// Assign location M to variableName
layout (location=M, component=2) in vec2 variableName;

// Assign locations [N,N+L) to the array elements of variableNameArray
layout (location=N) in vec4 variableNameArray[L];

In SPIR-V, vertex shaders associate input variables with a vertex input
attribute number using the `Location` decoration.
The `Component` decoration associates components of a vertex shader input
variable with components of a vertex input attribute.
The `Location` and `Component` decorations are specified via the
`OpDecorate` instruction.

SPIR-V Example

               ...
          %1 = OpExtInstImport "GLSL.std.450"
               ...
               OpName %9 "variableName"
               OpName %15 "variableNameArray"
               OpDecorate %18 BuiltIn VertexIndex
               OpDecorate %19 BuiltIn InstanceIndex
               OpDecorate %9 Location M
               OpDecorate %9 Component 2
               OpDecorate %15 Location N
               ...
          %2 = OpTypeVoid
          %3 = OpTypeFunction %2
          %6 = OpTypeFloat 32
          %7 = OpTypeVector %6 2
          %8 = OpTypePointer Input %7
          %9 = OpVariable %8 Input
         %10 = OpTypeVector %6 4
         %11 = OpTypeInt 32 0
         %12 = OpConstant %11 L
         %13 = OpTypeArray %10 %12
         %14 = OpTypePointer Input %13
         %15 = OpVariable %14 Input
               ...

The `Location` decoration specifies which vertex input attribute is used
to read and interpret the data that a variable will consume.

When a vertex shader input variable declared using a 16- or 32-bit scalar or
vector data type is assigned a `Location`, its value(s) are taken from
the components of the input attribute specified with the corresponding
`VkVertexInputAttributeDescription`::`location`.
The components used depend on the type of variable and the `Component`
decoration specified in the variable declaration, as identified in
[Input Attribute Components Accessed By 16-Bit and 32-Bit Input Variables](#fxvertex-attrib-components).
Any 16-bit or 32-bit scalar or vector input will consume a single
`Location`.
For 16-bit and 32-bit data types, missing components are filled in with
default values as described [below](#fxvertex-input-extraction).

If an implementation supports [`storageInputOutput16`](features.html#features-storageInputOutput16), vertex shader input variables **can** have a
width of 16 bits.

In all the following component assignment specifications, if
the [`vertexAttributeRobustness`](features.html#features-vertexAttributeRobustness)
feature is enabled,
or
the [`maintenance9`](features.html#features-maintenance9) feature is enabled,
and there is no `VkVertexInputAttributeDescription`::`location`
specified for the shader vertex attribute `Location` being read, the
value (0,0,0,0) or (0,0,0,1) is used for each of the equivalent (x,y,z,w)
components consumed entries as specified below.

| 16-bit or 32-bit data type | `Component` decoration | Components consumed |
| --- | --- | --- |
| scalar | 0 or unspecified | (x, o, o, o) |
| scalar | 1 | (o, y, o, o) |
| scalar | 2 | (o, o, z, o) |
| scalar | 3 | (o, o, o, w) |
| two-component vector | 0 or unspecified | (x, y, o, o) |
| two-component vector | 1 | (o, y, z, o) |
| two-component vector | 2 | (o, o, z, w) |
| three-component vector | 0 or unspecified | (x, y, z, o) |
| three-component vector | 1 | (o, y, z, w) |
| four-component vector | 0 or unspecified | (x, y, z, w) |

Components indicated by “o” are available for use by other input variables
which are sourced from the same attribute, and if used, are either filled
with the corresponding component from the input format (if present), or the
default value.

When a vertex shader input variable declared using a 32-bit floating-point
matrix type is assigned a `Location` *i*, its values are taken from
consecutive input attributes starting with the corresponding
`VkVertexInputAttributeDescription`::`location`.
Such matrices are treated as an array of column vectors with values taken
from the input attributes identified in [Input Attributes Accessed by 32-Bit Input Matrix Variables](#fxvertex-attrib-matrix).
The `VkVertexInputAttributeDescription`::`format` **must** be specified
with a [VkFormat](formats.html#VkFormat) that corresponds to the appropriate type of column
vector.
The `Component` decoration **must** not be used with matrix types.

| Data type | Column vector type | Locations consumed | Components consumed |
| --- | --- | --- | --- |
| mat2 | two-component vector | i, i+1 | (x, y, o, o), (x, y, o, o) |
| mat2x3 | three-component vector | i, i+1 | (x, y, z, o), (x, y, z, o) |
| mat2x4 | four-component vector | i, i+1 | (x, y, z, w), (x, y, z, w) |
| mat3x2 | two-component vector | i, i+1, i+2 | (x, y, o, o), (x, y, o, o), (x, y, o, o) |
| mat3 | three-component vector | i, i+1, i+2 | (x, y, z, o), (x, y, z, o), (x, y, z, o) |
| mat3x4 | four-component vector | i, i+1, i+2 | (x, y, z, w), (x, y, z, w), (x, y, z, w) |
| mat4x2 | two-component vector | i, i+1, i+2, i+3 | (x, y, o, o), (x, y, o, o), (x, y, o, o), (x, y, o, o) |
| mat4x3 | three-component vector | i, i+1, i+2, i+3 | (x, y, z, o), (x, y, z, o), (x, y, z, o), (x, y, z, o) |
| mat4 | four-component vector | i, i+1, i+2, i+3 | (x, y, z, w), (x, y, z, w), (x, y, z, w), (x, y, z, w) |

Components indicated by “o” are available for use by other input variables
which are sourced from the same attribute, and if used, are either filled
with the corresponding component from the input (if present), or the default
value.

When a vertex shader input variable declared using a scalar or vector 64-bit
data type is assigned a `Location` *i*, its values are taken from
consecutive input attributes starting with the corresponding
`VkVertexInputAttributeDescription`::`location`.
The `Location` slots and `Component` words used depend on the type of
variable and the `Component` decoration specified in the variable
declaration, as identified in [Input Attribute Locations and Components Accessed by 64-Bit Input Variables](#fxvertex-attrib-double).
For 64-bit data types, no default attribute values are provided.
Input variables **must** not use more components than provided by the
attribute.

| Input format | Locations consumed | 64-bit data type | `Location` decoration | `Component` decoration | 32-bit components consumed |
| --- | --- | --- | --- | --- | --- |
| R64 | i | scalar | i | 0 or unspecified | (x, y, -, -) |
| R64G64 | i | scalar | i | 0 or unspecified | (x, y, o, o) |
| scalar | i | 2 | (o, o, z, w) |
| two-component vector | i | 0 or unspecified | (x, y, z, w) |
| R64G64B64 | i, i+1 | scalar | i | 0 or unspecified | (x, y, o, o), (o, o, -, -) |
| scalar | i | 2 | (o, o, z, w), (o, o, -, -) |
| scalar | i+1 | 0 or unspecified | (o, o, o, o), (x, y, -, -) |
| two-component vector | i | 0 or unspecified | (x, y, z, w), (o, o, -, -) |
| three-component vector | i | unspecified | (x, y, z, w), (x, y, -, -) |
| R64G64B64A64 | i, i+1 | scalar | i | 0 or unspecified | (x, y, o, o), (o, o, o, o) |
| scalar | i | 2 | (o, o, z, w), (o, o, o, o) |
| scalar | i+1 | 0 or unspecified | (o, o, o, o), (x, y, o, o) |
| scalar | i+1 | 2 | (o, o, o, o), (o, o, z, w) |
| two-component vector | i | 0 or unspecified | (x, y, z, w), (o, o, o, o) |
| two-component vector | i+1 | 0 or unspecified | (o, o, o, o), (x, y, z, w) |
| three-component vector | i | unspecified | (x, y, z, w), (x, y, o, o) |
| four-component vector | i | unspecified | (x, y, z, w), (x, y, z, w) |

Components indicated by “o” are available for use by other input variables
which are sourced from the same attribute.
Components indicated by “-” are not available for input variables as there
are no default values provided for 64-bit data types, and there is no data
provided by the input format.

When a vertex shader input variable declared using a 64-bit floating-point
matrix type is assigned a `Location` *i*, its values are taken from
consecutive input attribute locations.
Such matrices are treated as an array of column vectors with values taken
from the input attributes as shown in [Input Attribute Locations and Components Accessed by 64-Bit Input Variables](#fxvertex-attrib-double).
Each column vector starts at the `Location` immediately following the
last `Location` of the previous column vector.
The number of attributes and components assigned to each matrix is
determined by the matrix dimensions and ranges from two to eight locations.

When a vertex shader input variable declared using an array type is assigned
a location, its values are taken from consecutive input attributes starting
with the corresponding
`VkVertexInputAttributeDescription`::`location`.
The number of attributes and components assigned to each element are
determined according to the data type of the array elements and
`Component` decoration (if any) specified in the declaration of the
array, as described above.
Each element of the array, in order, is assigned to consecutive locations,
but all at the same specified component within each location.

Only input variables declared with the data types and component decorations
as specified above are supported.
Two variables are allowed to share the same `Location` slot only if their
`Component` words do not overlap.
If multiple variables share the same `Location` slot, they **must** all have
the same SPIR-V floating-point component type or all have the same width
scalar type components.

Applications specify vertex input attribute and vertex input binding
descriptions as part of graphics pipeline creation by setting the
[VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo)::`pVertexInputState` pointer to a
[VkPipelineVertexInputStateCreateInfo](#VkPipelineVertexInputStateCreateInfo) structure.
Alternatively, if the graphics pipeline is created with the
[VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](pipelines.html#VkDynamicState) dynamic state enabled, then the
vertex input attribute and vertex input binding descriptions are specified
dynamically with [vkCmdSetVertexInputEXT](#vkCmdSetVertexInputEXT), and the
[VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo)::`pVertexInputState` pointer is
ignored.

The `VkPipelineVertexInputStateCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineVertexInputStateCreateInfo {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkPipelineVertexInputStateCreateFlags       flags;
    uint32_t                                    vertexBindingDescriptionCount;
    const VkVertexInputBindingDescription*      pVertexBindingDescriptions;
    uint32_t                                    vertexAttributeDescriptionCount;
    const VkVertexInputAttributeDescription*    pVertexAttributeDescriptions;
} VkPipelineVertexInputStateCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`vertexBindingDescriptionCount` is the number of vertex binding
descriptions provided in `pVertexBindingDescriptions`.

* 
`pVertexBindingDescriptions` is a pointer to an array of
[VkVertexInputBindingDescription](#VkVertexInputBindingDescription) structures.

* 
`vertexAttributeDescriptionCount` is the number of vertex attribute
descriptions provided in `pVertexAttributeDescriptions`.

* 
`pVertexAttributeDescriptions` is a pointer to an array of
[VkVertexInputAttributeDescription](#VkVertexInputAttributeDescription) structures.

Valid Usage

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-vertexBindingDescriptionCount-00613) VUID-VkPipelineVertexInputStateCreateInfo-vertexBindingDescriptionCount-00613

`vertexBindingDescriptionCount` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxVertexInputBindings`

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-vertexAttributeDescriptionCount-00614) VUID-VkPipelineVertexInputStateCreateInfo-vertexAttributeDescriptionCount-00614

`vertexAttributeDescriptionCount` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxVertexInputAttributes`

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-binding-00615) VUID-VkPipelineVertexInputStateCreateInfo-binding-00615

For every `binding` specified by each element of
`pVertexAttributeDescriptions`, a
[VkVertexInputBindingDescription](#VkVertexInputBindingDescription) **must** exist in
`pVertexBindingDescriptions` with the same value of `binding`

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-pVertexBindingDescriptions-00616) VUID-VkPipelineVertexInputStateCreateInfo-pVertexBindingDescriptions-00616

All elements of `pVertexBindingDescriptions` **must** describe distinct
binding numbers

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-pVertexAttributeDescriptions-00617) VUID-VkPipelineVertexInputStateCreateInfo-pVertexAttributeDescriptions-00617

All elements of `pVertexAttributeDescriptions` **must** describe
distinct attribute locations

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-sType-sType) VUID-VkPipelineVertexInputStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_STATE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-pNext-pNext) VUID-VkPipelineVertexInputStateCreateInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPipelineVertexInputDivisorStateCreateInfo](#VkPipelineVertexInputDivisorStateCreateInfo)

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-sType-unique) VUID-VkPipelineVertexInputStateCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-flags-zerobitmask) VUID-VkPipelineVertexInputStateCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-pVertexBindingDescriptions-parameter) VUID-VkPipelineVertexInputStateCreateInfo-pVertexBindingDescriptions-parameter

 If `vertexBindingDescriptionCount` is not `0`, `pVertexBindingDescriptions` **must** be a valid pointer to an array of `vertexBindingDescriptionCount` valid [VkVertexInputBindingDescription](#VkVertexInputBindingDescription) structures

* 
[](#VUID-VkPipelineVertexInputStateCreateInfo-pVertexAttributeDescriptions-parameter) VUID-VkPipelineVertexInputStateCreateInfo-pVertexAttributeDescriptions-parameter

 If `vertexAttributeDescriptionCount` is not `0`, `pVertexAttributeDescriptions` **must** be a valid pointer to an array of `vertexAttributeDescriptionCount` valid [VkVertexInputAttributeDescription](#VkVertexInputAttributeDescription) structures

// Provided by VK_VERSION_1_0
typedef VkFlags VkPipelineVertexInputStateCreateFlags;

`VkPipelineVertexInputStateCreateFlags` is a bitmask type for setting a
mask, but is currently reserved for future use.

Each vertex input binding is specified by the
`VkVertexInputBindingDescription` structure, defined as:

// Provided by VK_VERSION_1_0
typedef struct VkVertexInputBindingDescription {
    uint32_t             binding;
    uint32_t             stride;
    VkVertexInputRate    inputRate;
} VkVertexInputBindingDescription;

* 
`binding` is the binding number that this structure describes.

* 
`stride` is the byte stride between consecutive elements within the
buffer.

* 
`inputRate` is a [VkVertexInputRate](#VkVertexInputRate) value specifying whether
vertex attribute addressing is a function of the vertex index or of the
instance index.

Valid Usage

* 
[](#VUID-VkVertexInputBindingDescription-binding-00618) VUID-VkVertexInputBindingDescription-binding-00618

`binding` **must** be less than
`VkPhysicalDeviceLimits`::`maxVertexInputBindings`

* 
[](#VUID-VkVertexInputBindingDescription-stride-00619) VUID-VkVertexInputBindingDescription-stride-00619

`stride` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxVertexInputBindingStride`

* 
[](#VUID-VkVertexInputBindingDescription-stride-04456) VUID-VkVertexInputBindingDescription-stride-04456

If the `[VK_KHR_portability_subset](../appendices/extensions.html#VK_KHR_portability_subset)` extension is enabled,
`stride` **must** be a multiple of, and at least as large as,
[VkPhysicalDevicePortabilitySubsetPropertiesKHR](limits.html#VkPhysicalDevicePortabilitySubsetPropertiesKHR)::`minVertexInputBindingStrideAlignment`

Valid Usage (Implicit)

* 
[](#VUID-VkVertexInputBindingDescription-inputRate-parameter) VUID-VkVertexInputBindingDescription-inputRate-parameter

 `inputRate` **must** be a valid [VkVertexInputRate](#VkVertexInputRate) value

Possible values of [VkVertexInputBindingDescription](#VkVertexInputBindingDescription)::`inputRate`,
specifying the rate at which vertex attributes are pulled from buffers, are:

// Provided by VK_VERSION_1_0
typedef enum VkVertexInputRate {
    VK_VERTEX_INPUT_RATE_VERTEX = 0,
    VK_VERTEX_INPUT_RATE_INSTANCE = 1,
} VkVertexInputRate;

* 
[VK_VERTEX_INPUT_RATE_VERTEX](#VkVertexInputRate) specifies that vertex attribute
addressing is a function of the vertex index.

* 
[VK_VERTEX_INPUT_RATE_INSTANCE](#VkVertexInputRate) specifies that vertex attribute
addressing is a function of the instance index.

Each vertex input attribute is specified by the
`VkVertexInputAttributeDescription` structure, defined as:

// Provided by VK_VERSION_1_0
typedef struct VkVertexInputAttributeDescription {
    uint32_t    location;
    uint32_t    binding;
    VkFormat    format;
    uint32_t    offset;
} VkVertexInputAttributeDescription;

* 
`location` is the shader input location number for this attribute.

* 
`binding` is the binding number which this attribute takes its data
from.

* 
`format` is the size and type of the vertex attribute data.

* 
`offset` is a byte offset of this attribute relative to the start of
an element in the vertex input binding.

Valid Usage

* 
[](#VUID-VkVertexInputAttributeDescription-location-00620) VUID-VkVertexInputAttributeDescription-location-00620

`location` **must** be less than
`VkPhysicalDeviceLimits`::`maxVertexInputAttributes`

* 
[](#VUID-VkVertexInputAttributeDescription-binding-00621) VUID-VkVertexInputAttributeDescription-binding-00621

`binding` **must** be less than
`VkPhysicalDeviceLimits`::`maxVertexInputBindings`

* 
[](#VUID-VkVertexInputAttributeDescription-offset-00622) VUID-VkVertexInputAttributeDescription-offset-00622

`offset` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxVertexInputAttributeOffset`

* 
[](#VUID-VkVertexInputAttributeDescription-format-00623) VUID-VkVertexInputAttributeDescription-format-00623

The [format features](resources.html#resources-buffer-view-format-features) of
`format` **must** contain [VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkVertexInputAttributeDescription-vertexAttributeAccessBeyondStride-04457) VUID-VkVertexInputAttributeDescription-vertexAttributeAccessBeyondStride-04457

If the `[VK_KHR_portability_subset](../appendices/extensions.html#VK_KHR_portability_subset)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](features.html#VkPhysicalDevicePortabilitySubsetFeaturesKHR)::`vertexAttributeAccessBeyondStride`
is [VK_FALSE](fundamentals.html#VK_FALSE), the sum of `offset` plus the size of the vertex
attribute data described by `format` **must** not be greater than
`stride` in the [VkVertexInputBindingDescription](#VkVertexInputBindingDescription) referenced in
`binding`

Valid Usage (Implicit)

* 
[](#VUID-VkVertexInputAttributeDescription-format-parameter) VUID-VkVertexInputAttributeDescription-format-parameter

 `format` **must** be a valid [VkFormat](formats.html#VkFormat) value

To [dynamically set](pipelines.html#pipelines-dynamic-state) the vertex input attribute
and vertex input binding descriptions, call:

// Provided by VK_EXT_shader_object, VK_EXT_vertex_input_dynamic_state
void vkCmdSetVertexInputEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    vertexBindingDescriptionCount,
    const VkVertexInputBindingDescription2EXT*  pVertexBindingDescriptions,
    uint32_t                                    vertexAttributeDescriptionCount,
    const VkVertexInputAttributeDescription2EXT* pVertexAttributeDescriptions);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`vertexBindingDescriptionCount` is the number of vertex binding
descriptions provided in `pVertexBindingDescriptions`.

* 
`pVertexBindingDescriptions` is a pointer to an array of
[VkVertexInputBindingDescription2EXT](#VkVertexInputBindingDescription2EXT) structures.

* 
`vertexAttributeDescriptionCount` is the number of vertex attribute
descriptions provided in `pVertexAttributeDescriptions`.

* 
`pVertexAttributeDescriptions` is a pointer to an array of
[VkVertexInputAttributeDescription2EXT](#VkVertexInputAttributeDescription2EXT) structures.

This command sets the vertex input attribute and vertex input binding
descriptions state for subsequent drawing commands
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo)::`pVertexInputState` values used to
create the currently active pipeline.

If
drawing using [shader objects](shaders.html#shaders-objects),
or if
the bound pipeline state object was also created with the
[VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE](pipelines.html#VkDynamicState) dynamic state enabled,
then [vkCmdBindVertexBuffers2](#vkCmdBindVertexBuffers2) can be used instead of
`vkCmdSetVertexInputEXT` to dynamically set the stride.

The vertex attribute description for any location in the range
[0,`VkPhysicalDeviceLimits`::`maxVertexInputAttributes`) not
specified in the `pVertexAttributeDescriptions` array becomes
**undefined**.

Valid Usage

* 
[](#VUID-vkCmdSetVertexInputEXT-None-08546) VUID-vkCmdSetVertexInputEXT-None-08546

Either the [    `vertexInputDynamicState`](features.html#features-vertexInputDynamicState) feature or the [    `shaderObject`](features.html#features-shaderObject) feature or both **must** be enabled

* 
[](#VUID-vkCmdSetVertexInputEXT-vertexBindingDescriptionCount-04791) VUID-vkCmdSetVertexInputEXT-vertexBindingDescriptionCount-04791

`vertexBindingDescriptionCount` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxVertexInputBindings`

* 
[](#VUID-vkCmdSetVertexInputEXT-vertexAttributeDescriptionCount-04792) VUID-vkCmdSetVertexInputEXT-vertexAttributeDescriptionCount-04792

`vertexAttributeDescriptionCount` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxVertexInputAttributes`

* 
[](#VUID-vkCmdSetVertexInputEXT-binding-04793) VUID-vkCmdSetVertexInputEXT-binding-04793

For every `binding` specified by each element of
`pVertexAttributeDescriptions`, a
[VkVertexInputBindingDescription2EXT](#VkVertexInputBindingDescription2EXT) **must** exist in
`pVertexBindingDescriptions` with the same value of `binding`

* 
[](#VUID-vkCmdSetVertexInputEXT-pVertexBindingDescriptions-04794) VUID-vkCmdSetVertexInputEXT-pVertexBindingDescriptions-04794

All elements of `pVertexBindingDescriptions` **must** describe distinct
binding numbers

* 
[](#VUID-vkCmdSetVertexInputEXT-pVertexAttributeDescriptions-04795) VUID-vkCmdSetVertexInputEXT-pVertexAttributeDescriptions-04795

All elements of `pVertexAttributeDescriptions` **must** describe
distinct attribute locations

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetVertexInputEXT-commandBuffer-parameter) VUID-vkCmdSetVertexInputEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetVertexInputEXT-pVertexBindingDescriptions-parameter) VUID-vkCmdSetVertexInputEXT-pVertexBindingDescriptions-parameter

 If `vertexBindingDescriptionCount` is not `0`, `pVertexBindingDescriptions` **must** be a valid pointer to an array of `vertexBindingDescriptionCount` valid [VkVertexInputBindingDescription2EXT](#VkVertexInputBindingDescription2EXT) structures

* 
[](#VUID-vkCmdSetVertexInputEXT-pVertexAttributeDescriptions-parameter) VUID-vkCmdSetVertexInputEXT-pVertexAttributeDescriptions-parameter

 If `vertexAttributeDescriptionCount` is not `0`, `pVertexAttributeDescriptions` **must** be a valid pointer to an array of `vertexAttributeDescriptionCount` valid [VkVertexInputAttributeDescription2EXT](#VkVertexInputAttributeDescription2EXT) structures

* 
[](#VUID-vkCmdSetVertexInputEXT-commandBuffer-recording) VUID-vkCmdSetVertexInputEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetVertexInputEXT-commandBuffer-cmdpool) VUID-vkCmdSetVertexInputEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetVertexInputEXT-videocoding) VUID-vkCmdSetVertexInputEXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetVertexInputEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkVertexInputBindingDescription2EXT` structure is defined as:

// Provided by VK_EXT_shader_object, VK_EXT_vertex_input_dynamic_state
typedef struct VkVertexInputBindingDescription2EXT {
    VkStructureType      sType;
    void*                pNext;
    uint32_t             binding;
    uint32_t             stride;
    VkVertexInputRate    inputRate;
    uint32_t             divisor;
} VkVertexInputBindingDescription2EXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`binding` is the binding number that this structure describes.

* 
`stride` is the byte stride between consecutive elements within the
buffer.

* 
`inputRate` is a [VkVertexInputRate](#VkVertexInputRate) value specifying whether
vertex attribute addressing is a function of the vertex index or of the
instance index.

* 
`divisor` is the number of successive instances that will use the
same value of the vertex attribute when instanced rendering is enabled.
This member **can** be a value other than `1` if the
[    `vertexAttributeInstanceRateDivisor`](features.html#features-vertexAttributeInstanceRateDivisor) feature is enabled.
For example, if the divisor is N, the same vertex attribute will be
applied to N successive instances before moving on to the next vertex
attribute.
The maximum value of `divisor` is implementation-dependent and can
be queried using
`VkPhysicalDeviceVertexAttributeDivisorPropertiesEXT`::`maxVertexAttribDivisor`.
A value of `0` **can** be used for the divisor if the
[    `vertexAttributeInstanceRateZeroDivisor`](features.html#features-vertexAttributeInstanceRateZeroDivisor) feature is enabled.
In this case, the same vertex attribute will be applied to all
instances.

Valid Usage

* 
[](#VUID-VkVertexInputBindingDescription2EXT-binding-04796) VUID-VkVertexInputBindingDescription2EXT-binding-04796

`binding` **must** be less than
`VkPhysicalDeviceLimits`::`maxVertexInputBindings`

* 
[](#VUID-VkVertexInputBindingDescription2EXT-stride-04797) VUID-VkVertexInputBindingDescription2EXT-stride-04797

`stride` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxVertexInputBindingStride`

* 
[](#VUID-VkVertexInputBindingDescription2EXT-divisor-04798) VUID-VkVertexInputBindingDescription2EXT-divisor-04798

If the [    `vertexAttributeInstanceRateZeroDivisor`](features.html#features-vertexAttributeInstanceRateZeroDivisor) feature is not enabled,
`divisor` **must** not be `0`

* 
[](#VUID-VkVertexInputBindingDescription2EXT-divisor-04799) VUID-VkVertexInputBindingDescription2EXT-divisor-04799

If the [    `vertexAttributeInstanceRateDivisor`](features.html#features-vertexAttributeInstanceRateDivisor) feature is not enabled,
`divisor` **must** be `1`

* 
[](#VUID-VkVertexInputBindingDescription2EXT-divisor-06226) VUID-VkVertexInputBindingDescription2EXT-divisor-06226

`divisor` **must** be a value between `0` and
`VkPhysicalDeviceVertexAttributeDivisorPropertiesEXT`::`maxVertexAttribDivisor`,
inclusive

* 
[](#VUID-VkVertexInputBindingDescription2EXT-divisor-06227) VUID-VkVertexInputBindingDescription2EXT-divisor-06227

If `divisor` is not `1` then `inputRate` **must** be of type
[VK_VERTEX_INPUT_RATE_INSTANCE](#VkVertexInputRate)

Valid Usage (Implicit)

* 
[](#VUID-VkVertexInputBindingDescription2EXT-sType-sType) VUID-VkVertexInputBindingDescription2EXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VERTEX_INPUT_BINDING_DESCRIPTION_2_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkVertexInputBindingDescription2EXT-inputRate-parameter) VUID-VkVertexInputBindingDescription2EXT-inputRate-parameter

 `inputRate` **must** be a valid [VkVertexInputRate](#VkVertexInputRate) value

The `VkVertexInputAttributeDescription2EXT` structure is defined as:

// Provided by VK_EXT_shader_object, VK_EXT_vertex_input_dynamic_state
typedef struct VkVertexInputAttributeDescription2EXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           location;
    uint32_t           binding;
    VkFormat           format;
    uint32_t           offset;
} VkVertexInputAttributeDescription2EXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`location` is the shader input location number for this attribute.

* 
`binding` is the binding number which this attribute takes its data
from.

* 
`format` is the size and type of the vertex attribute data.

* 
`offset` is a byte offset of this attribute relative to the start of
an element in the vertex input binding.

Valid Usage

* 
[](#VUID-VkVertexInputAttributeDescription2EXT-location-06228) VUID-VkVertexInputAttributeDescription2EXT-location-06228

`location` **must** be less than
`VkPhysicalDeviceLimits`::`maxVertexInputAttributes`

* 
[](#VUID-VkVertexInputAttributeDescription2EXT-binding-06229) VUID-VkVertexInputAttributeDescription2EXT-binding-06229

`binding` **must** be less than
`VkPhysicalDeviceLimits`::`maxVertexInputBindings`

* 
[](#VUID-VkVertexInputAttributeDescription2EXT-offset-06230) VUID-VkVertexInputAttributeDescription2EXT-offset-06230

`offset` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxVertexInputAttributeOffset`

* 
[](#VUID-VkVertexInputAttributeDescription2EXT-format-04805) VUID-VkVertexInputAttributeDescription2EXT-format-04805

The [format features](resources.html#resources-buffer-view-format-features) of
`format` **must** contain [VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkVertexInputAttributeDescription2EXT-vertexAttributeAccessBeyondStride-04806) VUID-VkVertexInputAttributeDescription2EXT-vertexAttributeAccessBeyondStride-04806

If the `[VK_KHR_portability_subset](../appendices/extensions.html#VK_KHR_portability_subset)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](features.html#VkPhysicalDevicePortabilitySubsetFeaturesKHR)::`vertexAttributeAccessBeyondStride`
is [VK_FALSE](fundamentals.html#VK_FALSE), the sum of `offset` plus the size of the vertex
attribute data described by `format` **must** not be greater than
`stride` in the [VkVertexInputBindingDescription2EXT](#VkVertexInputBindingDescription2EXT) referenced
in `binding`

Valid Usage (Implicit)

* 
[](#VUID-VkVertexInputAttributeDescription2EXT-sType-sType) VUID-VkVertexInputAttributeDescription2EXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VERTEX_INPUT_ATTRIBUTE_DESCRIPTION_2_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkVertexInputAttributeDescription2EXT-format-parameter) VUID-VkVertexInputAttributeDescription2EXT-format-parameter

 `format` **must** be a valid [VkFormat](formats.html#VkFormat) value

To bind strided address ranges as vertex buffers to a command buffer for use
in subsequent drawing commands, call:

// Provided by VK_KHR_device_address_commands
void vkCmdBindVertexBuffers3KHR(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstBinding,
    uint32_t                                    bindingCount,
    const VkBindVertexBuffer3InfoKHR*           pBindingInfos);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`firstBinding` is the index of the first vertex input binding whose
state is updated by the command.

* 
`bindingCount` is the number of vertex input bindings whose state is
updated by the command.

* 
`pInfos` is a pointer to an array of
[VkBindVertexBuffer3InfoKHR](#VkBindVertexBuffer3InfoKHR) structures defining address ranges to
bind as vertex buffers.

The values taken from the address ranges defined by elements i of
`pInfos` replace the current state for the vertex input binding
`firstBinding` +  i, for i in [0,
`bindingCount`).
The vertex input binding is updated to the range of memory indicated by
`pInfos`[i].
All vertex input attributes that use each of these bindings will use these
updated addresses in their address calculations for subsequent drawing
commands.
If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is enabled,
elements of `pInfos` **can** have a `addressRange.size` and
`addressRange.address` of 0.
If a vertex input attribute is bound to a vertex input binding with a
`size` and `address` of 0, the values taken from memory are
considered to be zero, and missing G, B, or A components are
[filled with (0](#fxvertex-input-extraction).

This command also [dynamically sets](pipelines.html#pipelines-dynamic-state) the byte
strides between consecutive elements within the strided range defined by
`pInfos`[i] to the value of `pInfos`[i].addressRange.stride
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, strides are specified by the
VkVertexInputBindingDescription::stride values used to create the currently
active pipeline.

If
drawing using [shader objects](shaders.html#shaders-objects)
or if
the bound pipeline state object was also created with the
[VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](pipelines.html#VkDynamicState) dynamic state enabled
then [vkCmdSetVertexInputEXT](#vkCmdSetVertexInputEXT) **can** be used instead of
`vkCmdBindVertexBuffers2` to set the stride.

|  | Unlike the static state to set the same, `stride` for each address range
| --- | --- |
must be between 0 and the maximum extent of the attributes in the binding.
[vkCmdSetVertexInputEXT](#vkCmdSetVertexInputEXT) does not have this restriction so can be used
if other stride values are desired. |

Valid Usage

* 
[](#VUID-vkCmdBindVertexBuffers3KHR-firstBinding-13070) VUID-vkCmdBindVertexBuffers3KHR-firstBinding-13070

`firstBinding` **must** be less than
`VkPhysicalDeviceLimits`::`maxVertexInputBindings`

* 
[](#VUID-vkCmdBindVertexBuffers3KHR-firstBinding-13071) VUID-vkCmdBindVertexBuffers3KHR-firstBinding-13071

The sum of `firstBinding` and `bindingCount` **must** be less than
or equal to `VkPhysicalDeviceLimits`::`maxVertexInputBindings`

* 
[](#VUID-vkCmdBindVertexBuffers3KHR-addressRange-13073) VUID-vkCmdBindVertexBuffers3KHR-addressRange-13073

The `addressRange.stride` of all elements of `pInfos` **must** be
either 0 or greater than or equal to the maximum extent of all vertex
input attributes fetched from the corresponding binding, where the
extent is calculated as the
[VkVertexInputAttributeDescription](#VkVertexInputAttributeDescription)::`offset` plus
[VkVertexInputAttributeDescription](#VkVertexInputAttributeDescription)::`format` size

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindVertexBuffers3KHR-commandBuffer-parameter) VUID-vkCmdBindVertexBuffers3KHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindVertexBuffers3KHR-pBindingInfos-parameter) VUID-vkCmdBindVertexBuffers3KHR-pBindingInfos-parameter

 `pBindingInfos` **must** be a valid pointer to an array of `bindingCount` valid [VkBindVertexBuffer3InfoKHR](#VkBindVertexBuffer3InfoKHR) structures

* 
[](#VUID-vkCmdBindVertexBuffers3KHR-commandBuffer-recording) VUID-vkCmdBindVertexBuffers3KHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindVertexBuffers3KHR-commandBuffer-cmdpool) VUID-vkCmdBindVertexBuffers3KHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindVertexBuffers3KHR-videocoding) VUID-vkCmdBindVertexBuffers3KHR-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindVertexBuffers3KHR-bindingCount-arraylength) VUID-vkCmdBindVertexBuffers3KHR-bindingCount-arraylength

 `bindingCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindVertexBuffers3KHR is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

`VkBindVertexBuffer3InfoKHR` is defined as:

// Provided by VK_KHR_device_address_commands
typedef struct VkBindVertexBuffer3InfoKHR {
    VkStructureType                   sType;
    const void*                       pNext;
    VkBool32                          setStride;
    VkStridedDeviceAddressRangeKHR    addressRange;
    VkAddressCommandFlagsKHR          addressFlags;
} VkBindVertexBuffer3InfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`setStride` is a `VkBool32` value indicating whether
`addressRange.stride` sets the stride for the buffer.
If `setStride` is [VK_TRUE](fundamentals.html#VK_TRUE), the dynamic stride is set for all
attributes from this buffer.
If `setStride` is [VK_FALSE](fundamentals.html#VK_FALSE), the stride value is not set.

* 
`addressRange` is the [VkStridedDeviceAddressRangeKHR](fundamentals.html#VkStridedDeviceAddressRangeKHR) of the
address range to bind.

* 
`addressFlags` is a [VkAddressCommandFlagsKHR](fundamentals.html#VkAddressCommandFlagsKHR) value defining
the flags for the address range.

Valid Usage

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressRange-13097) VUID-VkBindVertexBuffer3InfoKHR-addressRange-13097

If the range specified by `addressRange` is not bound completely
to memory when accessed, `addressFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressRange-13098) VUID-VkBindVertexBuffer3InfoKHR-addressRange-13098

If the buffer from which the range specified by `addressRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits), and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressRange-13099) VUID-VkBindVertexBuffer3InfoKHR-addressRange-13099

If the buffer from which the range specified by `addressRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits), and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressFlags-13100) VUID-VkBindVertexBuffer3InfoKHR-addressFlags-13100

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressRange-13122) VUID-VkBindVertexBuffer3InfoKHR-addressRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits), `addressFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressRange-13123) VUID-VkBindVertexBuffer3InfoKHR-addressRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits), `addressFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressFlags-13101) VUID-VkBindVertexBuffer3InfoKHR-addressFlags-13101

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressRange-13124) VUID-VkBindVertexBuffer3InfoKHR-addressRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressRange-13125) VUID-VkBindVertexBuffer3InfoKHR-addressRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressRange-13074) VUID-VkBindVertexBuffer3InfoKHR-addressRange-13074

If `addressRange.address` is not 0, the buffer from which
`addressRange` was queried **must** have been created with the
[VK_BUFFER_USAGE_VERTEX_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressRange-13075) VUID-VkBindVertexBuffer3InfoKHR-addressRange-13075

If `addressRange.size` is 0, `addressRange.address` **must** be 0

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-size-13072) VUID-VkBindVertexBuffer3InfoKHR-size-13072

If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled,
`addressRange.size` **must** not be 0

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-setStride-13126) VUID-VkBindVertexBuffer3InfoKHR-setStride-13126

If `setStride` is [VK_TRUE](fundamentals.html#VK_TRUE), `addressRange.stride` **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxVertexInputBindingStride`

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-setStride-13127) VUID-VkBindVertexBuffer3InfoKHR-setStride-13127

If `setStride` is [VK_FALSE](fundamentals.html#VK_FALSE), `addressRange.stride` **must** be
0

Valid Usage (Implicit)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-sType-sType) VUID-VkBindVertexBuffer3InfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_VERTEX_BUFFER_3_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-pNext-pNext) VUID-VkBindVertexBuffer3InfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBindVertexBuffer3InfoKHR-addressFlags-parameter) VUID-VkBindVertexBuffer3InfoKHR-addressFlags-parameter

 `addressFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](fundamentals.html#VkAddressCommandFlagBitsKHR) values

To bind vertex buffers, along with their sizes and strides, to a command
buffer for use in subsequent drawing commands, call:

// Provided by VK_VERSION_1_3
void vkCmdBindVertexBuffers2(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstBinding,
    uint32_t                                    bindingCount,
    const VkBuffer*                             pBuffers,
    const VkDeviceSize*                         pOffsets,
    const VkDeviceSize*                         pSizes,
    const VkDeviceSize*                         pStrides);

// Provided by VK_EXT_extended_dynamic_state, VK_EXT_shader_object
// Equivalent to vkCmdBindVertexBuffers2
void vkCmdBindVertexBuffers2EXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstBinding,
    uint32_t                                    bindingCount,
    const VkBuffer*                             pBuffers,
    const VkDeviceSize*                         pOffsets,
    const VkDeviceSize*                         pSizes,
    const VkDeviceSize*                         pStrides);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`firstBinding` is the index of the first vertex input binding whose
state is updated by the command.

* 
`bindingCount` is the number of vertex input bindings whose state is
updated by the command.

* 
`pBuffers` is a pointer to an array of buffer handles.

* 
`pOffsets` is a pointer to an array of buffer offsets.

* 
`pSizes` is `NULL` or a pointer to an array of the size in bytes of
vertex data bound from `pBuffers`.

* 
`pStrides` is `NULL` or a pointer to an array of buffer strides.

The values taken from elements i of `pBuffers` and `pOffsets`
replace the current state for the vertex input binding
`firstBinding` +  i, for i in [0,
`bindingCount`).
The vertex input binding is updated to start at the offset indicated by
`pOffsets`[i] from the start of the buffer `pBuffers`[i].
If `pSizes` is not `NULL` then `pSizes`[i] specifies the bound size
of the vertex buffer starting from the corresponding elements of
`pBuffers`[i] plus `pOffsets`[i].
If `pSizes`[i] is [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE) then the bound size is from
`pBuffers`[i] plus `pOffsets`[i] to the end of the buffer
`pBuffers`[i].
All vertex input attributes that use each of these bindings will use these
updated addresses in their address calculations for subsequent drawing
commands.
If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is enabled,
elements of `pBuffers` **can** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and **can** be used by
the vertex shader.
If a vertex input attribute is bound to a vertex input binding that is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the values taken from memory are considered to be
zero, and missing G, B, or A components are
[filled with (0](#fxvertex-input-extraction).

This command also [dynamically sets](pipelines.html#pipelines-dynamic-state) the byte
strides between consecutive elements within buffer `pBuffers`[i] to the
corresponding `pStrides`[i] value
when drawing using [shader objects](shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, strides are specified by the
[VkVertexInputBindingDescription](#VkVertexInputBindingDescription)::`stride` values used to create
the currently active pipeline.

If
drawing using [shader objects](shaders.html#shaders-objects)
or if
the bound pipeline state object was also created with the
[VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](pipelines.html#VkDynamicState) dynamic state enabled
then [vkCmdSetVertexInputEXT](#vkCmdSetVertexInputEXT) **can** be used instead of
`vkCmdBindVertexBuffers2` to set the stride.

|  | Unlike the static state to set the same, `pStrides` must be between 0
| --- | --- |
and the maximum extent of the attributes in the binding.
[vkCmdSetVertexInputEXT](#vkCmdSetVertexInputEXT) does not have this restriction so can be used
if other stride values are desired. |

Valid Usage

* 
[](#VUID-vkCmdBindVertexBuffers2-None-08971) VUID-vkCmdBindVertexBuffers2-None-08971

At least one of the following **must** be true:

the [`extendedDynamicState`](features.html#features-extendedDynamicState)
feature is enabled

* 
the [`shaderObject`](features.html#features-shaderObject) feature is enabled

* 
the value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` used to create
the [VkInstance](initialization.html#VkInstance) parent of `commandBuffer` is greater than or
equal to Version 1.3

[](#VUID-vkCmdBindVertexBuffers2-firstBinding-03355) VUID-vkCmdBindVertexBuffers2-firstBinding-03355

`firstBinding` **must** be less than
`VkPhysicalDeviceLimits`::`maxVertexInputBindings`

[](#VUID-vkCmdBindVertexBuffers2-firstBinding-03356) VUID-vkCmdBindVertexBuffers2-firstBinding-03356

The sum of `firstBinding` and `bindingCount` **must** be less than
or equal to `VkPhysicalDeviceLimits`::`maxVertexInputBindings`

[](#VUID-vkCmdBindVertexBuffers2-pOffsets-03357) VUID-vkCmdBindVertexBuffers2-pOffsets-03357

If `pSizes` is not `NULL`, all elements of `pOffsets` **must** be
less than the size of the corresponding element in `pBuffers`

[](#VUID-vkCmdBindVertexBuffers2-pSizes-03358) VUID-vkCmdBindVertexBuffers2-pSizes-03358

If `pSizes` is not `NULL`, all elements of `pOffsets` plus
`pSizes`
, where `pSizes` is not [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE),
**must** be less than or equal to the size of the corresponding element in
`pBuffers`

[](#VUID-vkCmdBindVertexBuffers2-pBuffers-03359) VUID-vkCmdBindVertexBuffers2-pBuffers-03359

All elements of `pBuffers` **must** have been created with the
[VK_BUFFER_USAGE_VERTEX_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

[](#VUID-vkCmdBindVertexBuffers2-pBuffers-03360) VUID-vkCmdBindVertexBuffers2-pBuffers-03360

Each element of `pBuffers` that is non-sparse **must** be bound
completely and contiguously to a single `VkDeviceMemory` object

[](#VUID-vkCmdBindVertexBuffers2-pBuffers-04111) VUID-vkCmdBindVertexBuffers2-pBuffers-04111

If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, all elements of `pBuffers` **must** not be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

[](#VUID-vkCmdBindVertexBuffers2-pBuffers-04112) VUID-vkCmdBindVertexBuffers2-pBuffers-04112

If an element of `pBuffers` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), then the
corresponding element of `pOffsets` **must** be zero

[](#VUID-vkCmdBindVertexBuffers2-pStrides-03362) VUID-vkCmdBindVertexBuffers2-pStrides-03362

If `pStrides` is not `NULL` each element of `pStrides` **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxVertexInputBindingStride`

[](#VUID-vkCmdBindVertexBuffers2-pStrides-06209) VUID-vkCmdBindVertexBuffers2-pStrides-06209

If `pStrides` is not `NULL` each element of `pStrides` **must** be
either 0 or greater than or equal to the maximum extent of all vertex
input attributes fetched from the corresponding binding, where the
extent is calculated as the
[VkVertexInputAttributeDescription](#VkVertexInputAttributeDescription)::`offset` plus
[VkVertexInputAttributeDescription](#VkVertexInputAttributeDescription)::`format` size

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindVertexBuffers2-commandBuffer-parameter) VUID-vkCmdBindVertexBuffers2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindVertexBuffers2-pBuffers-parameter) VUID-vkCmdBindVertexBuffers2-pBuffers-parameter

 `pBuffers` **must** be a valid pointer to an array of `bindingCount` valid or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) [VkBuffer](resources.html#VkBuffer) handles

* 
[](#VUID-vkCmdBindVertexBuffers2-pOffsets-parameter) VUID-vkCmdBindVertexBuffers2-pOffsets-parameter

 `pOffsets` **must** be a valid pointer to an array of `bindingCount` `VkDeviceSize` values

* 
[](#VUID-vkCmdBindVertexBuffers2-pSizes-parameter) VUID-vkCmdBindVertexBuffers2-pSizes-parameter

 If `pSizes` is not `NULL`, `pSizes` **must** be a valid pointer to an array of `bindingCount` `VkDeviceSize` values

* 
[](#VUID-vkCmdBindVertexBuffers2-pStrides-parameter) VUID-vkCmdBindVertexBuffers2-pStrides-parameter

 If `pStrides` is not `NULL`, `pStrides` **must** be a valid pointer to an array of `bindingCount` `VkDeviceSize` values

* 
[](#VUID-vkCmdBindVertexBuffers2-commandBuffer-recording) VUID-vkCmdBindVertexBuffers2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindVertexBuffers2-commandBuffer-cmdpool) VUID-vkCmdBindVertexBuffers2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindVertexBuffers2-videocoding) VUID-vkCmdBindVertexBuffers2-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindVertexBuffers2-bindingCount-arraylength) VUID-vkCmdBindVertexBuffers2-bindingCount-arraylength

 If any of `pSizes`, or `pStrides` are not `NULL`, `bindingCount` **must** be greater than `0`

* 
[](#VUID-vkCmdBindVertexBuffers2-commonparent) VUID-vkCmdBindVertexBuffers2-commonparent

 Both of `commandBuffer`, and the elements of `pBuffers` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindVertexBuffers2 is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To bind vertex buffers to a command buffer for use in subsequent drawing
commands, call:

// Provided by VK_VERSION_1_0
void vkCmdBindVertexBuffers(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstBinding,
    uint32_t                                    bindingCount,
    const VkBuffer*                             pBuffers,
    const VkDeviceSize*                         pOffsets);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`firstBinding` is the index of the first vertex input binding whose
state is updated by the command.

* 
`bindingCount` is the number of vertex input bindings whose state is
updated by the command.

* 
`pBuffers` is a pointer to an array of buffer handles.

* 
`pOffsets` is a pointer to an array of buffer offsets.

The values taken from elements i of `pBuffers` and `pOffsets`
replace the current state for the vertex input binding
`firstBinding` +  i, for i in [0,
`bindingCount`).
The vertex input binding is updated to start at the offset indicated by
`pOffsets`[i] from the start of the buffer `pBuffers`[i].
All vertex input attributes that use each of these bindings will use these
updated addresses in their address calculations for subsequent drawing
commands.
If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is enabled,
elements of `pBuffers` **can** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and **can** be used by
the vertex shader.
If a vertex input attribute is bound to a vertex input binding that is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the values taken from memory are considered to be
zero, and missing G, B, or A components are
[filled with (0](#fxvertex-input-extraction).

Valid Usage

* 
[](#VUID-vkCmdBindVertexBuffers-firstBinding-00624) VUID-vkCmdBindVertexBuffers-firstBinding-00624

`firstBinding` **must** be less than
`VkPhysicalDeviceLimits`::`maxVertexInputBindings`

* 
[](#VUID-vkCmdBindVertexBuffers-firstBinding-00625) VUID-vkCmdBindVertexBuffers-firstBinding-00625

The sum of `firstBinding` and `bindingCount` **must** be less than
or equal to `VkPhysicalDeviceLimits`::`maxVertexInputBindings`

* 
[](#VUID-vkCmdBindVertexBuffers-pOffsets-00626) VUID-vkCmdBindVertexBuffers-pOffsets-00626

All elements of `pOffsets` **must** be less than the size of the
corresponding element in `pBuffers`

* 
[](#VUID-vkCmdBindVertexBuffers-pBuffers-00627) VUID-vkCmdBindVertexBuffers-pBuffers-00627

All elements of `pBuffers` **must** have been created with the
[VK_BUFFER_USAGE_VERTEX_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) flag

* 
[](#VUID-vkCmdBindVertexBuffers-pBuffers-00628) VUID-vkCmdBindVertexBuffers-pBuffers-00628

Each element of `pBuffers` that is non-sparse **must** be bound
completely and contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-vkCmdBindVertexBuffers-pBuffers-04001) VUID-vkCmdBindVertexBuffers-pBuffers-04001

If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, all elements of `pBuffers` **must** not be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCmdBindVertexBuffers-pBuffers-04002) VUID-vkCmdBindVertexBuffers-pBuffers-04002

If an element of `pBuffers` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), then the
corresponding element of `pOffsets` **must** be zero

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindVertexBuffers-commandBuffer-parameter) VUID-vkCmdBindVertexBuffers-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindVertexBuffers-pBuffers-parameter) VUID-vkCmdBindVertexBuffers-pBuffers-parameter

 `pBuffers` **must** be a valid pointer to an array of `bindingCount` valid or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) [VkBuffer](resources.html#VkBuffer) handles

* 
[](#VUID-vkCmdBindVertexBuffers-pOffsets-parameter) VUID-vkCmdBindVertexBuffers-pOffsets-parameter

 `pOffsets` **must** be a valid pointer to an array of `bindingCount` `VkDeviceSize` values

* 
[](#VUID-vkCmdBindVertexBuffers-commandBuffer-recording) VUID-vkCmdBindVertexBuffers-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindVertexBuffers-commandBuffer-cmdpool) VUID-vkCmdBindVertexBuffers-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindVertexBuffers-videocoding) VUID-vkCmdBindVertexBuffers-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindVertexBuffers-bindingCount-arraylength) VUID-vkCmdBindVertexBuffers-bindingCount-arraylength

 `bindingCount` **must** be greater than `0`

* 
[](#VUID-vkCmdBindVertexBuffers-commonparent) VUID-vkCmdBindVertexBuffers-commonparent

 Both of `commandBuffer`, and the elements of `pBuffers` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindVertexBuffers is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

If the [`vertexAttributeInstanceRateDivisor`](features.html#features-vertexAttributeInstanceRateDivisor) feature is enabled and the
`pNext` chain of [VkPipelineVertexInputStateCreateInfo](#VkPipelineVertexInputStateCreateInfo) includes a
`VkPipelineVertexInputDivisorStateCreateInfo` structure, then that
structure controls how vertex attributes are assigned to an instance when
instanced rendering is enabled.

The `VkPipelineVertexInputDivisorStateCreateInfo` structure is defined
as:

// Provided by VK_VERSION_1_4
typedef struct VkPipelineVertexInputDivisorStateCreateInfo {
    VkStructureType                                  sType;
    const void*                                      pNext;
    uint32_t                                         vertexBindingDivisorCount;
    const VkVertexInputBindingDivisorDescription*    pVertexBindingDivisors;
} VkPipelineVertexInputDivisorStateCreateInfo;

// Provided by VK_KHR_vertex_attribute_divisor
// Equivalent to VkPipelineVertexInputDivisorStateCreateInfo
typedef VkPipelineVertexInputDivisorStateCreateInfo VkPipelineVertexInputDivisorStateCreateInfoKHR;

// Provided by VK_EXT_vertex_attribute_divisor
// Equivalent to VkPipelineVertexInputDivisorStateCreateInfo
typedef VkPipelineVertexInputDivisorStateCreateInfo VkPipelineVertexInputDivisorStateCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`vertexBindingDivisorCount` is the number of elements in the
`pVertexBindingDivisors` array.

* 
`pVertexBindingDivisors` is a pointer to an array of
[VkVertexInputBindingDivisorDescription](#VkVertexInputBindingDivisorDescription) structures specifying the
divisor value for each binding.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineVertexInputDivisorStateCreateInfo-sType-sType) VUID-VkPipelineVertexInputDivisorStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_DIVISOR_STATE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineVertexInputDivisorStateCreateInfo-pVertexBindingDivisors-parameter) VUID-VkPipelineVertexInputDivisorStateCreateInfo-pVertexBindingDivisors-parameter

 `pVertexBindingDivisors` **must** be a valid pointer to an array of `vertexBindingDivisorCount` [VkVertexInputBindingDivisorDescription](#VkVertexInputBindingDivisorDescription) structures

* 
[](#VUID-VkPipelineVertexInputDivisorStateCreateInfo-vertexBindingDivisorCount-arraylength) VUID-VkPipelineVertexInputDivisorStateCreateInfo-vertexBindingDivisorCount-arraylength

 `vertexBindingDivisorCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineVertexInputStateCreateInfo](#VkPipelineVertexInputStateCreateInfo)

The individual divisor values per binding are specified using the
`VkVertexInputBindingDivisorDescription` structure which is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkVertexInputBindingDivisorDescription {
    uint32_t    binding;
    uint32_t    divisor;
} VkVertexInputBindingDivisorDescription;

// Provided by VK_KHR_vertex_attribute_divisor
// Equivalent to VkVertexInputBindingDivisorDescription
typedef VkVertexInputBindingDivisorDescription VkVertexInputBindingDivisorDescriptionKHR;

// Provided by VK_EXT_vertex_attribute_divisor
// Equivalent to VkVertexInputBindingDivisorDescription
typedef VkVertexInputBindingDivisorDescription VkVertexInputBindingDivisorDescriptionEXT;

* 
`binding` is the binding number for which the divisor is specified.

* 
`divisor` is the number of successive instances that will use the
same value of the vertex attribute when instanced rendering is enabled.
For example, if the divisor is N, the same vertex attribute will be
applied to N successive instances before moving on to the next vertex
attribute.
The maximum value of `divisor` is implementation-dependent and can
be queried using
[VkPhysicalDeviceVertexAttributeDivisorProperties](limits.html#VkPhysicalDeviceVertexAttributeDivisorProperties)::`maxVertexAttribDivisor`.
A value of `0` **can** be used for the divisor if the
[    `vertexAttributeInstanceRateZeroDivisor`](features.html#features-vertexAttributeInstanceRateZeroDivisor) feature is enabled.
In this case, the same vertex attribute will be applied to all
instances.

If this structure is not used to define a divisor value for an attribute,
then the divisor has a logical default value of 1.

Valid Usage

* 
[](#VUID-VkVertexInputBindingDivisorDescription-binding-01869) VUID-VkVertexInputBindingDivisorDescription-binding-01869

`binding` **must** be less than
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`maxVertexInputBindings`

* 
[](#VUID-VkVertexInputBindingDivisorDescription-vertexAttributeInstanceRateZeroDivisor-02228) VUID-VkVertexInputBindingDivisorDescription-vertexAttributeInstanceRateZeroDivisor-02228

If the [    `vertexAttributeInstanceRateZeroDivisor`](features.html#features-vertexAttributeInstanceRateZeroDivisor) feature is not enabled,
`divisor` **must** not be `0`

* 
[](#VUID-VkVertexInputBindingDivisorDescription-vertexAttributeInstanceRateDivisor-02229) VUID-VkVertexInputBindingDivisorDescription-vertexAttributeInstanceRateDivisor-02229

If the [    `vertexAttributeInstanceRateDivisor`](features.html#features-vertexAttributeInstanceRateDivisor) feature is not enabled,
`divisor` **must** be `1`

* 
[](#VUID-VkVertexInputBindingDivisorDescription-divisor-01870) VUID-VkVertexInputBindingDivisorDescription-divisor-01870

`divisor` **must** be a value between `0` and
[VkPhysicalDeviceVertexAttributeDivisorProperties](limits.html#VkPhysicalDeviceVertexAttributeDivisorProperties)::`maxVertexAttribDivisor`,
inclusive

* 
[](#VUID-VkVertexInputBindingDivisorDescription-inputRate-01871) VUID-VkVertexInputBindingDivisorDescription-inputRate-01871

[VkVertexInputBindingDescription](#VkVertexInputBindingDescription)::`inputRate` **must** be of type
[VK_VERTEX_INPUT_RATE_INSTANCE](#VkVertexInputRate) for this `binding`

The address of each attribute for each `vertexIndex` and
`instanceIndex` is calculated as follows:

* 
Let `attribDesc` be the member of
[VkPipelineVertexInputStateCreateInfo](#VkPipelineVertexInputStateCreateInfo)::`pVertexAttributeDescriptions`
with [VkVertexInputAttributeDescription](#VkVertexInputAttributeDescription)::`location` equal to
the vertex input attribute number.

* 
Let `bindingDesc` be the member of
[VkPipelineVertexInputStateCreateInfo](#VkPipelineVertexInputStateCreateInfo)::`pVertexBindingDescriptions`
with [VkVertexInputAttributeDescription](#VkVertexInputAttributeDescription)::`binding` equal to
`attribDesc.binding`.

* 
Let `vertexIndex` be the index of the vertex within the draw (a value
between `firstVertex` and `firstVertex`+`vertexCount` for
`vkCmdDraw`, or a value taken from the index buffer plus
`vertexOffset` for `vkCmdDrawIndexed`), and let
`instanceIndex` be the instance number of the draw (a value between
`firstInstance` and `firstInstance`+`instanceCount`).

* 
Let `offset` be an array of offsets into the bound vertex buffers
    specified during `vkCmdBindVertexBuffers`
or `vkCmdBindVertexBuffers2`
    with `pOffsets`.

* 
Let `divisor` be the member of
[VkPipelineVertexInputDivisorStateCreateInfo](#VkPipelineVertexInputDivisorStateCreateInfo)::`pVertexBindingDivisors`
with [VkVertexInputBindingDivisorDescription](#VkVertexInputBindingDivisorDescription)::`binding` equal
to `attribDesc.binding`.
If the vertex binding state is dynamically set, instead let `divisor`
be the member of the `pVertexBindingDescriptions` parameter to the
[vkCmdSetVertexInputEXT](#vkCmdSetVertexInputEXT) call with
[VkVertexInputBindingDescription2EXT](#VkVertexInputBindingDescription2EXT)::`binding` equal to
`attribDesc.binding`.

* 
Let `stride` be the member of
[VkPipelineVertexInputStateCreateInfo](#VkPipelineVertexInputStateCreateInfo)::`pVertexBindingDescriptions->stride`
unless there is dynamic state causing the value to be ignored.
In this case the value is set from the last value from one of the
following

[vkCmdSetVertexInputEXT](#vkCmdSetVertexInputEXT)::`pVertexBindingDescriptions->stride`

* 
[vkCmdBindVertexBuffers2](#vkCmdBindVertexBuffers2)::`pStrides`, if not `NULL`

bufferBindingAddress = buffer[binding].baseAddress + offset[binding];

if (bindingDesc.inputRate == VK_VERTEX_INPUT_RATE_VERTEX)
    effectiveVertexOffset = vertexIndex * stride;
else
    if (divisor == 0)
        effectiveVertexOffset = firstInstance * stride;
    else
        effectiveVertexOffset = (firstInstance + ((instanceIndex - firstInstance) / divisor)) * stride;

attribAddress = bufferBindingAddress + effectiveVertexOffset + attribDesc.offset;

For each attribute, raw data is extracted starting at `attribAddress` and is
converted from the [VkVertexInputAttributeDescription](#VkVertexInputAttributeDescription)’s `format` in
the same manner as described for [image reads](images.html#images-reads) as if a texel
were read from that address.
The numeric type of the attribute’s `format` **must** match the numeric
type of the input variable in the shader.
The input variable in the shader **must** be declared as a 64-bit data type if
and only if `format` is a 64-bit data type.
If the sum of `attribAddress` and the data extracted is outside of the bound
vertex buffer, behavior is as described by
[Shader Out-of-Bounds Memory Access](shaders.html#shaders-execution-memory-access-bounds).

If
either `format` is a 64-bit format or the
[`legacyVertexAttributes`](features.html#features-legacyVertexAttributes) feature is
not enabled, and
`format` is a packed format, `attribAddress` **must** be a multiple of the
size in bytes of the size of the format as described in
[Packed Formats](formats.html#formats-packed).
Otherwise,
if either `format` is a 64-bit format or the
[`legacyVertexAttributes`](features.html#features-legacyVertexAttributes) feature is
not enabled,
`attribAddress` **must** be a multiple of the size in bytes of the component
type indicated by `format` (see [Formats](formats.html#formats)).

The number of components in the vertex shader input variable need not
exactly match the number of components in the format.
If the vertex shader has fewer components, the extra components are
discarded.
If the [numeric format](formats.html#formats-numericformat) of `format` uses sRGB
encoding, and the [`maintenance10`](features.html#features-maintenance10) feature is
enabled, the implementation **must** convert values from nonlinear to linear as
described in the “sRGB EOTF” section of the [Khronos Data Format Specification](introduction.html#data-format).
If the [`maintenance10`](features.html#features-maintenance10) feature is not
enabled, the implementation **should** convert values from nonlinear to linear.
Implementations
which do not support [`maintenance10`](features.html#features-maintenance10), and
which do not convert nonlinear to linear for sRGB formats **should** not expose
[VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](formats.html#VkFormatFeatureFlagBits) for such formats.
