# VkPhysicalDeviceShaderEnqueuePropertiesAMDX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderEnqueuePropertiesAMDX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderEnqueuePropertiesAMDX - Structure describing shader enqueue limits of an implementation

The `VkPhysicalDeviceShaderEnqueuePropertiesAMDX` structure is defined
as:

// Provided by VK_AMDX_shader_enqueue
typedef struct VkPhysicalDeviceShaderEnqueuePropertiesAMDX {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxExecutionGraphDepth;
    uint32_t           maxExecutionGraphShaderOutputNodes;
    uint32_t           maxExecutionGraphShaderPayloadSize;
    uint32_t           maxExecutionGraphShaderPayloadCount;
    uint32_t           executionGraphDispatchAddressAlignment;
    uint32_t           maxExecutionGraphWorkgroupCount[3];
    uint32_t           maxExecutionGraphWorkgroups;
} VkPhysicalDeviceShaderEnqueuePropertiesAMDX;

The members of the `VkPhysicalDeviceShaderEnqueuePropertiesAMDX`
structure describe the following limits:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxExecutionGraphDepth` defines
the maximum node chain depth in the graph.
The dispatched node is at depth 1 and the node enqueued by it is at
depth 2, and so on.
If a node enqueues itself, each recursive enqueue increases the depth by
1 as well.

* 

`maxExecutionGraphShaderOutputNodes` specifies the maximum number of
unique nodes that can be dispatched from a single shader, and **must** be
at least 256.

* 

`maxExecutionGraphShaderPayloadSize` specifies the maximum total
size of payload declarations in a shader.
For any payload declarations that share resources, indicated by
`NodeSharesPayloadLimitsWithAMDX` decorations, the maximum size of
each set of shared payload declarations is taken.
The sum of each shared set’s maximum size and the size of each unshared
payload is counted against this limit.

* 

`maxExecutionGraphShaderPayloadCount` specifies the maximum number
of output payloads that can be initialized in a single workgroup.

* 

`executionGraphDispatchAddressAlignment` specifies the alignment of
non-scratch `VkDeviceAddress` arguments consumed by graph
dispatch commands.

* 

`maxExecutionGraphWorkgroupCount`[3] is the maximum number of local
workgroups that a shader **can** be dispatched with in X, Y, and Z
dimensions, respectively.

* 
 `maxExecutionGraphWorkgroups`
is the total number of local workgroups that a shader **can** be dispatched
with.

If the `VkPhysicalDeviceShaderEnqueuePropertiesAMDX` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderEnqueuePropertiesAMDX-sType-sType) VUID-VkPhysicalDeviceShaderEnqueuePropertiesAMDX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ENQUEUE_PROPERTIES_AMDX](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_AMDX_shader_enqueue](VK_AMDX_shader_enqueue.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceShaderEnqueuePropertiesAMDX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
