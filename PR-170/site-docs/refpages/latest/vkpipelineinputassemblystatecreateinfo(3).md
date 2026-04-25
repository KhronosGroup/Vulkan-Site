# VkPipelineInputAssemblyStateCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineInputAssemblyStateCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineInputAssemblyStateCreateInfo - Structure specifying parameters of a newly created pipeline input assembly state

Drawing can be achieved in two modes:

* 
[Programmable Mesh Shading](../../../../spec/latest/chapters/drawing.html#drawing-mesh-shading), the mesh shader
assembles primitives, or

* 
[Programmable Primitive Shading](../../../../spec/latest/chapters/drawing.html#drawing-primitive-shading), the input
primitives are assembled as follows.

Each draw is made up of zero or more vertices and zero or more instances,
which are processed by the device and result in the assembly of primitives.
Primitives are assembled according to the `pInputAssemblyState` member
of the [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html) structure, which is of type
`VkPipelineInputAssemblyStateCreateInfo`:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineInputAssemblyStateCreateInfo {
    VkStructureType                            sType;
    const void*                                pNext;
    VkPipelineInputAssemblyStateCreateFlags    flags;
    VkPrimitiveTopology                        topology;
    VkBool32                                   primitiveRestartEnable;
} VkPipelineInputAssemblyStateCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`topology` is a [VkPrimitiveTopology](VkPrimitiveTopology.html) defining the primitive
topology, as described below.

* 
`primitiveRestartEnable` controls whether a special vertex index
    value is treated as restarting the assembly of primitives.
    This enable only applies to indexed draws ([vkCmdDrawIndexed](vkCmdDrawIndexed.html),
    [vkCmdDrawMultiIndexedEXT](vkCmdDrawMultiIndexedEXT.html),
    and [vkCmdDrawIndexedIndirect](vkCmdDrawIndexedIndirect.html)), and the special index value is
    either 0xFFFFFFFF when the `indexType` parameter of
Vulkan 1.4 or
`vkCmdBindIndexBuffer2` or
    `vkCmdBindIndexBuffer` is equal to [VK_INDEX_TYPE_UINT32](VkIndexType.html);
    0xFF when `indexType` is equal to [VK_INDEX_TYPE_UINT8](VkIndexType.html);
    or 0xFFFF when `indexType` is equal to [VK_INDEX_TYPE_UINT16](VkIndexType.html).
    Primitive restart is not allowed for “list” topologies, unless one of
    the features [    `primitiveTopologyPatchListRestart`](../../../../spec/latest/chapters/features.html#features-primitiveTopologyPatchListRestart) (for
    [VK_PRIMITIVE_TOPOLOGY_PATCH_LIST](VkPrimitiveTopology.html)) or
    [    `primitiveTopologyListRestart`](../../../../spec/latest/chapters/features.html#features-primitiveTopologyListRestart) (for all other list topologies) is
    enabled.

Restarting the assembly of primitives discards the most recent index values
if those elements formed an incomplete primitive, and restarts the primitive
assembly using the subsequent indices, but only assembling the immediately
following element through the end of the originally specified elements.
The primitive restart index value comparison is performed before adding the
`vertexOffset` value to the index value.

Valid Usage

* 
[](#VUID-VkPipelineInputAssemblyStateCreateInfo-topology-06252) VUID-VkPipelineInputAssemblyStateCreateInfo-topology-06252

If
the [    `primitiveTopologyListRestart`](../../../../spec/latest/chapters/features.html#features-primitiveTopologyListRestart) feature is not enabled, and
`topology` is [VK_PRIMITIVE_TOPOLOGY_POINT_LIST](VkPrimitiveTopology.html),
[VK_PRIMITIVE_TOPOLOGY_LINE_LIST](VkPrimitiveTopology.html),
[VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST](VkPrimitiveTopology.html),
[VK_PRIMITIVE_TOPOLOGY_LINE_LIST_WITH_ADJACENCY](VkPrimitiveTopology.html), or
[VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST_WITH_ADJACENCY](VkPrimitiveTopology.html),
`primitiveRestartEnable` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkPipelineInputAssemblyStateCreateInfo-topology-06253) VUID-VkPipelineInputAssemblyStateCreateInfo-topology-06253

If
the [    `primitiveTopologyPatchListRestart`](../../../../spec/latest/chapters/features.html#features-primitiveTopologyPatchListRestart) feature is not enabled, and
`topology` is [VK_PRIMITIVE_TOPOLOGY_PATCH_LIST](VkPrimitiveTopology.html),
`primitiveRestartEnable` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkPipelineInputAssemblyStateCreateInfo-topology-00429) VUID-VkPipelineInputAssemblyStateCreateInfo-topology-00429

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `topology` **must** not be any of
[VK_PRIMITIVE_TOPOLOGY_LINE_LIST_WITH_ADJACENCY](VkPrimitiveTopology.html),
[VK_PRIMITIVE_TOPOLOGY_LINE_STRIP_WITH_ADJACENCY](VkPrimitiveTopology.html),
[VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST_WITH_ADJACENCY](VkPrimitiveTopology.html) or
[VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP_WITH_ADJACENCY](VkPrimitiveTopology.html)

* 
[](#VUID-VkPipelineInputAssemblyStateCreateInfo-topology-00430) VUID-VkPipelineInputAssemblyStateCreateInfo-topology-00430

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `topology` **must** not be
[VK_PRIMITIVE_TOPOLOGY_PATCH_LIST](VkPrimitiveTopology.html)

* 
[](#VUID-VkPipelineInputAssemblyStateCreateInfo-triangleFans-04452) VUID-VkPipelineInputAssemblyStateCreateInfo-triangleFans-04452

If the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html)::`triangleFans`
is [VK_FALSE](VK_FALSE.html), `topology` **must** not be
[VK_PRIMITIVE_TOPOLOGY_TRIANGLE_FAN](VkPrimitiveTopology.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineInputAssemblyStateCreateInfo-sType-sType) VUID-VkPipelineInputAssemblyStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_INPUT_ASSEMBLY_STATE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPipelineInputAssemblyStateCreateInfo-pNext-pNext) VUID-VkPipelineInputAssemblyStateCreateInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPipelineInputAssemblyStateCreateInfo-flags-zerobitmask) VUID-VkPipelineInputAssemblyStateCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkPipelineInputAssemblyStateCreateInfo-topology-parameter) VUID-VkPipelineInputAssemblyStateCreateInfo-topology-parameter

 `topology` **must** be a valid [VkPrimitiveTopology](VkPrimitiveTopology.html) value

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkBool32`, [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkPipelineInputAssemblyStateCreateFlags](VkPipelineInputAssemblyStateCreateFlags.html), [VkPrimitiveTopology](VkPrimitiveTopology.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#VkPipelineInputAssemblyStateCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
