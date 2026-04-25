# VkDescriptorSetLayoutBindingFlagsCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorSetLayoutBindingFlagsCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorSetLayoutBindingFlagsCreateInfo - Structure specifying creation flags for descriptor set layout bindings

If the `pNext` chain of a [VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html)
structure includes a [VkDescriptorSetLayoutBindingFlagsCreateInfo](#)
structure, then that structure includes an array of flags, one for each
descriptor set layout binding.

The [VkDescriptorSetLayoutBindingFlagsCreateInfo](#) structure is defined
as:

// Provided by VK_VERSION_1_2
typedef struct VkDescriptorSetLayoutBindingFlagsCreateInfo {
    VkStructureType                    sType;
    const void*                        pNext;
    uint32_t                           bindingCount;
    const VkDescriptorBindingFlags*    pBindingFlags;
} VkDescriptorSetLayoutBindingFlagsCreateInfo;

// Provided by VK_EXT_descriptor_indexing
// Equivalent to VkDescriptorSetLayoutBindingFlagsCreateInfo
typedef VkDescriptorSetLayoutBindingFlagsCreateInfo VkDescriptorSetLayoutBindingFlagsCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`bindingCount` is zero or the number of elements in
`pBindingFlags`.

* 
`pBindingFlags` is a pointer to an array of
[VkDescriptorBindingFlags](VkDescriptorBindingFlags.html) bitfields, one for each descriptor set
layout binding.

If `bindingCount` is zero or if this structure is not included in the
`pNext` chain, the [VkDescriptorBindingFlags](VkDescriptorBindingFlags.html) for each descriptor
set layout binding is considered to be zero.
Otherwise, the descriptor set layout binding at
[VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html)::`pBindings`[i] uses the flags in
`pBindingFlags`[i].

Valid Usage

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-bindingCount-03002) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-bindingCount-03002

If `bindingCount` is not zero, `bindingCount` **must** equal
[VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html)::`bindingCount`

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-flags-03003) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-flags-03003

If [VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html)::`flags` includes
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](VkDescriptorSetLayoutCreateFlagBits.html), then all
elements of `pBindingFlags` **must** not include
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html),
[VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT](VkDescriptorBindingFlagBits.html), or
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](VkDescriptorBindingFlagBits.html)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-pBindingFlags-03004) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-pBindingFlags-03004

If an element of `pBindingFlags` includes
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](VkDescriptorBindingFlagBits.html), then it **must**
be the element with the highest `binding` number

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingUniformBufferUpdateAfterBind-03005) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingUniformBufferUpdateAfterBind-03005

If
[VkPhysicalDeviceDescriptorIndexingFeatures](VkPhysicalDeviceDescriptorIndexingFeatures.html)::`descriptorBindingUniformBufferUpdateAfterBind`
is not enabled, all bindings with descriptor type
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingSampledImageUpdateAfterBind-03006) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingSampledImageUpdateAfterBind-03006

If
[VkPhysicalDeviceDescriptorIndexingFeatures](VkPhysicalDeviceDescriptorIndexingFeatures.html)::`descriptorBindingSampledImageUpdateAfterBind`
is not enabled, all bindings with descriptor type
[VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingStorageImageUpdateAfterBind-03007) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingStorageImageUpdateAfterBind-03007

If
[VkPhysicalDeviceDescriptorIndexingFeatures](VkPhysicalDeviceDescriptorIndexingFeatures.html)::`descriptorBindingStorageImageUpdateAfterBind`
is not enabled, all bindings with descriptor type
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingStorageBufferUpdateAfterBind-03008) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingStorageBufferUpdateAfterBind-03008

If
[VkPhysicalDeviceDescriptorIndexingFeatures](VkPhysicalDeviceDescriptorIndexingFeatures.html)::`descriptorBindingStorageBufferUpdateAfterBind`
is not enabled, all bindings with descriptor type
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingUniformTexelBufferUpdateAfterBind-03009) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingUniformTexelBufferUpdateAfterBind-03009

If
[VkPhysicalDeviceDescriptorIndexingFeatures](VkPhysicalDeviceDescriptorIndexingFeatures.html)::`descriptorBindingUniformTexelBufferUpdateAfterBind`
is not enabled, all bindings with descriptor type
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingStorageTexelBufferUpdateAfterBind-03010) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingStorageTexelBufferUpdateAfterBind-03010

If
[VkPhysicalDeviceDescriptorIndexingFeatures](VkPhysicalDeviceDescriptorIndexingFeatures.html)::`descriptorBindingStorageTexelBufferUpdateAfterBind`
is not enabled, all bindings with descriptor type
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingInlineUniformBlockUpdateAfterBind-02211) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingInlineUniformBlockUpdateAfterBind-02211

If
[VkPhysicalDeviceInlineUniformBlockFeatures](VkPhysicalDeviceInlineUniformBlockFeatures.html)::`descriptorBindingInlineUniformBlockUpdateAfterBind`
is not enabled, all bindings with descriptor type
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingAccelerationStructureUpdateAfterBind-03570) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingAccelerationStructureUpdateAfterBind-03570

If
[VkPhysicalDeviceAccelerationStructureFeaturesKHR](VkPhysicalDeviceAccelerationStructureFeaturesKHR.html)::`descriptorBindingAccelerationStructureUpdateAfterBind`
is not enabled, all bindings with descriptor type
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-None-03011) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-None-03011

All bindings with descriptor type
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingUpdateUnusedWhilePending-03012) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingUpdateUnusedWhilePending-03012

If
[VkPhysicalDeviceDescriptorIndexingFeatures](VkPhysicalDeviceDescriptorIndexingFeatures.html)::`descriptorBindingUpdateUnusedWhilePending`
is not enabled, all elements of `pBindingFlags` **must** not include
[VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT](VkDescriptorBindingFlagBits.html)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingPartiallyBound-03013) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingPartiallyBound-03013

If
[VkPhysicalDeviceDescriptorIndexingFeatures](VkPhysicalDeviceDescriptorIndexingFeatures.html)::`descriptorBindingPartiallyBound`
is not enabled, all elements of `pBindingFlags` **must** not include
[VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT](VkDescriptorBindingFlagBits.html)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingVariableDescriptorCount-03014) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingVariableDescriptorCount-03014

If
[VkPhysicalDeviceDescriptorIndexingFeatures](VkPhysicalDeviceDescriptorIndexingFeatures.html)::`descriptorBindingVariableDescriptorCount`
is not enabled, all elements of `pBindingFlags` **must** not include
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](VkDescriptorBindingFlagBits.html)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-pBindingFlags-03015) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-pBindingFlags-03015

If an element of `pBindingFlags` includes
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](VkDescriptorBindingFlagBits.html), that
element’s `descriptorType` **must** not be
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingStorageTensorUpdateAfterBind-09697) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingStorageTensorUpdateAfterBind-09697

If
[VkPhysicalDeviceTensorFeaturesARM](VkPhysicalDeviceTensorFeaturesARM.html)::`descriptorBindingStorageTensorUpdateAfterBind`
is not enabled, all bindings with descriptor type
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-sType-sType) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_BINDING_FLAGS_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-pBindingFlags-parameter) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-pBindingFlags-parameter

 If `bindingCount` is not `0`, `pBindingFlags` **must** be a valid pointer to an array of `bindingCount` valid combinations of [VkDescriptorBindingFlagBits](VkDescriptorBindingFlagBits.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html)

[VK_EXT_descriptor_indexing](VK_EXT_descriptor_indexing.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkDescriptorBindingFlags](VkDescriptorBindingFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkDescriptorSetLayoutBindingFlagsCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
