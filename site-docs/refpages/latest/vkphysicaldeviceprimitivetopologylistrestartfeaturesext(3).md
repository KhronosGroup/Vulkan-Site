# VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT - Structure describing whether list type primitives can support primitive restart

The `VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT` structure
is defined as:

// Provided by VK_EXT_primitive_topology_list_restart
typedef struct VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           primitiveTopologyListRestart;
    VkBool32           primitiveTopologyPatchListRestart;
} VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`primitiveTopologyListRestart` indicates that list type primitives,
[VK_PRIMITIVE_TOPOLOGY_POINT_LIST](VkPrimitiveTopology.html),
[VK_PRIMITIVE_TOPOLOGY_LINE_LIST](VkPrimitiveTopology.html),
[VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST](VkPrimitiveTopology.html),
[VK_PRIMITIVE_TOPOLOGY_LINE_LIST_WITH_ADJACENCY](VkPrimitiveTopology.html) and
[VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST_WITH_ADJACENCY](VkPrimitiveTopology.html), **can** use the
primitive restart index value in index buffers.

* 

`primitiveTopologyPatchListRestart` indicates that the
[VK_PRIMITIVE_TOPOLOGY_PATCH_LIST](VkPrimitiveTopology.html) topology **can** use the primitive
restart index value in index buffers.

If the `VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT-sType-sType) VUID-VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRIMITIVE_TOPOLOGY_LIST_RESTART_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_primitive_topology_list_restart](VK_EXT_primitive_topology_list_restart.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
