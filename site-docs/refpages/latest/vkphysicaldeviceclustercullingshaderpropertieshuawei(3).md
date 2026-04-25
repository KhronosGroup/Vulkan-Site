# VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI - Structure describing cluster culling shader properties supported by an implementation

The `VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI` structure is
defined as:

// Provided by VK_HUAWEI_cluster_culling_shader
typedef struct VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxWorkGroupCount[3];
    uint32_t           maxWorkGroupSize[3];
    uint32_t           maxOutputClusterCount;
    VkDeviceSize       indirectBufferOffsetAlignment;
} VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxWorkGroupCount`[3] is the maximum number of local workgroups
that can be launched by a single command.
These three value represent the maximum local workgroup count in the X,
Y, and Z dimensions, respectively.
In the current implementation, the values of Y and Z are both implicitly
set as one.
groupCountX of DrawCluster command **must** be less than or equal to
maxWorkGroupCount[0].

* 
`maxWorkGroupSize`[3] is the maximum size of a local workgroup.
    These three value represent the maximum local workgroup size in the X,
    Y, and Z dimensions, respectively.
    The x, y, and z sizes, as specified by the `LocalSize`
or `LocalSizeId`
    execution mode or by the object decorated by the WorkgroupSize
    decoration in shader modules, **must** be less than or equal to the
    corresponding limit.
    In the current implementation, the maximum workgroup size of the X
    dimension is 32, the others are 1.

* 
`maxOutputClusterCount` is the maximum number of output cluster a
single cluster culling shader workgroup can emit.

* 
`indirectBufferOffsetAlignment` indicates the alignment for cluster
drawing command buffer stride.
[vkCmdDrawClusterIndirectHUAWEI](vkCmdDrawClusterIndirectHUAWEI.html)::`offset` **must** be a multiple
of this value.

If the `VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI-sType-sType) VUID-VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CLUSTER_CULLING_SHADER_PROPERTIES_HUAWEI](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_HUAWEI_cluster_culling_shader](VK_HUAWEI_cluster_culling_shader.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
