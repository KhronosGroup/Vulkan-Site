# VkPhysicalDeviceMaintenance7PropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMaintenance7PropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMaintenance7PropertiesKHR - Structure describing various implementation-defined properties introduced with VK_KHR_maintenance7

The `VkPhysicalDeviceMaintenance7PropertiesKHR` structure is defined as:

// Provided by VK_KHR_maintenance7
typedef struct VkPhysicalDeviceMaintenance7PropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           robustFragmentShadingRateAttachmentAccess;
    VkBool32           separateDepthStencilAttachmentAccess;
    uint32_t           maxDescriptorSetTotalUniformBuffersDynamic;
    uint32_t           maxDescriptorSetTotalStorageBuffersDynamic;
    uint32_t           maxDescriptorSetTotalBuffersDynamic;
    uint32_t           maxDescriptorSetUpdateAfterBindTotalUniformBuffersDynamic;
    uint32_t           maxDescriptorSetUpdateAfterBindTotalStorageBuffersDynamic;
    uint32_t           maxDescriptorSetUpdateAfterBindTotalBuffersDynamic;
} VkPhysicalDeviceMaintenance7PropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`robustFragmentShadingRateAttachmentAccess` indicates whether the
scaled size of a fragment shading rate attachment **can** be less than the
size of the render area.
If `robustFragmentShadingRateAttachmentAccess` is [VK_FALSE](VK_FALSE.html),
the size of the attachment multiplied by the texel size **must** be greater
than or equal to the size of the render area.
If it is [VK_TRUE](VK_TRUE.html) and the fragment shading rate attachment was
created with [VkImageSubresourceRange](VkImageSubresourceRange.html)::`baseMipLevel` equal to
0, the scaled size **can** be smaller than the render area, with missing
shading rates defined by [out    of bounds behavior](../../../../spec/latest/chapters/shaders.html#shaders-execution-memory-access-bounds).

* 

`separateDepthStencilAttachmentAccess` indicates support for writing
to one aspect of a depth/stencil attachment without performing
read-modify-write operations on the other aspect.
If this property is [VK_TRUE](VK_TRUE.html), writes to one aspect **must** not result
in read-modify-write operations on the other aspect.
If [VK_FALSE](VK_FALSE.html), writes to one aspect **may** result in writes to the
other aspect as defined by [render pass load    operations](../../../../spec/latest/chapters/renderpass.html#renderpass-load-operations), [render pass store    operations](../../../../spec/latest/chapters/renderpass.html#renderpass-store-operations) and [render pass resolve    operations](../../../../spec/latest/chapters/renderpass.html#renderpass-resolve-operations).

* 

`maxDescriptorSetTotalUniformBuffersDynamic` is the maximum total
count of dynamic uniform buffers that **can** be included in a pipeline
layout.
Descriptors with a type of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.
See [Dynamic Uniform Buffer](../../../../spec/latest/chapters/descriptors.html#descriptors-uniformbufferdynamic).

* 

`maxDescriptorSetTotalStorageBuffersDynamic` is the maximum total
count of dynamic storage buffers that **can** be included in a pipeline
layout.
Descriptors with a type of
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.
See [Dynamic Storage Buffer](../../../../spec/latest/chapters/descriptors.html#descriptors-storagebufferdynamic).

* 

`maxDescriptorSetTotalBuffersDynamic` is the maximum total count of
dynamic uniform buffers and storage buffers that **can** be included in a
pipeline layout.
Descriptors with a type of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.

* 

`maxDescriptorSetUpdateAfterBindTotalUniformBuffersDynamic` is
similar to `maxDescriptorSetTotalUniformBuffersDynamic` but counts
descriptors from descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.

* 

`maxDescriptorSetUpdateAfterBindTotalStorageBuffersDynamic` is
similar to `maxDescriptorSetTotalStorageBuffersDynamic` but counts
descriptors from descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.

* 

`maxDescriptorSetUpdateAfterBindTotalBuffersDynamic` is similar to
`maxDescriptorSetTotalBuffersDynamic` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit
set.
While an application **can** allocate dynamic storage buffer descriptors
from a pool created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html),
bindings for these descriptors **must** not be present in any descriptor
set layout that includes bindings created with
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html).

If the `VkPhysicalDeviceMaintenance7PropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance7PropertiesKHR-sType-sType) VUID-VkPhysicalDeviceMaintenance7PropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_7_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_maintenance7](VK_KHR_maintenance7.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceMaintenance7PropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
