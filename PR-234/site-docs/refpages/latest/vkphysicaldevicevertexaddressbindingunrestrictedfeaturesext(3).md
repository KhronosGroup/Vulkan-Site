# VkPhysicalDeviceVertexAddressBindingUnrestrictedFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceVertexAddressBindingUnrestrictedFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [Valid Usage (Implicit)](#undefined)
- [Valid_Usage_(Implicit)](#undefined)
- [Structure Chaining](#undefined)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceVertexAddressBindingUnrestrictedFeaturesEXT - Structure describing support for unrestricted vertex address binding

The `VkPhysicalDeviceVertexAddressBindingUnrestrictedFeaturesEXT`
structure is defined as:

// Provided by VK_EXT_vertex_address_binding_unrestricted
typedef struct VkPhysicalDeviceVertexAddressBindingUnrestrictedFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           vertexAddressBindingUnrestricted;
} VkPhysicalDeviceVertexAddressBindingUnrestrictedFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`vertexAddressBindingUnrestricted` specifies whether the
implementation supports using [vkCmdBindVertexBuffers3KHR](vkCmdBindVertexBuffers3KHR.html) to bind
vertex buffer addresses without bounds checking.

If the `VkPhysicalDeviceVertexAddressBindingUnrestrictedFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceVertexAddressBindingUnrestrictedFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

* 
[](#VUID-VkPhysicalDeviceVertexAddressBindingUnrestrictedFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceVertexAddressBindingUnrestrictedFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ADDRESS_BINDING_UNRESTRICTED_FEATURES_EXT](VkStructureType.html)

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_vertex_address_binding_unrestricted](VK_EXT_vertex_address_binding_unrestricted.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceVertexAddressBindingUnrestrictedFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
