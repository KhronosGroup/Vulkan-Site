# VK_VALVE_mutable_descriptor_type(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_VALVE_mutable_descriptor_type.html

## Table of Contents

- [Name](#_name)
- [VK_VALVE_mutable_descriptor_type](#VK_VALVE_mutable_descriptor_type)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_VALVE_mutable_descriptor_type - device extension

**Name String**

`VK_VALVE_mutable_descriptor_type`

**Extension Type**

Device extension

**Registered Extension Number**

352

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_maintenance3](VK_KHR_maintenance3.html)

**Deprecation State**

* 
*Promoted* to
[VK_EXT_mutable_descriptor_type](VK_EXT_mutable_descriptor_type.html)
extension

**Special Use**

* 
[D3D support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Joshua Ashton [Joshua-Ashton](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_VALVE_mutable_descriptor_type] @Joshua-Ashton%0A*Here describe the issue or question you have about the VK_VALVE_mutable_descriptor_type extension*)

* 
Hans-Kristian Arntzen [HansKristian-Work](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_VALVE_mutable_descriptor_type] @HansKristian-Work%0A*Here describe the issue or question you have about the VK_VALVE_mutable_descriptor_type extension*)

**Last Modified Date**

2020-12-02

**IP Status**

No known IP claims.

**Contributors**

* 
Joshua Ashton, Valve

* 
Hans-Kristian Arntzen, Valve

This extension allows applications to reduce descriptor memory footprint by
allowing a descriptor to be able to mutate to a given list of descriptor
types depending on which descriptor types are written into, or copied into a
descriptor set.

The main use case this extension intends to address is descriptor indexing
with [VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](VkDescriptorBindingFlagBits.html) where the
descriptor types are completely generic, as this means applications can
allocate one large descriptor set, rather than having one large descriptor
set per descriptor type, which significantly bloats descriptor memory usage
and causes performance issues.

This extension also adds a mechanism to declare that a descriptor pool, and
therefore the descriptor sets that are allocated from it, reside only in
host memory; as such these descriptors can only be updated/copied, but not
bound.

These features together allow much more efficient emulation of the raw D3D12
binding model.
This extension is primarily intended to be useful for API layering efforts.

* 
[VkMutableDescriptorTypeListVALVE](VkMutableDescriptorTypeListEXT.html)

* 
Extending [VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html), [VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html):

[VkMutableDescriptorTypeCreateInfoVALVE](VkMutableDescriptorTypeCreateInfoEXT.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceMutableDescriptorTypeFeaturesVALVE](VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT.html)

* 
`VK_VALVE_MUTABLE_DESCRIPTOR_TYPE_EXTENSION_NAME`

* 
`VK_VALVE_MUTABLE_DESCRIPTOR_TYPE_SPEC_VERSION`

* 
Extending [VkDescriptorPoolCreateFlagBits](VkDescriptorPoolCreateFlagBits.html):

[VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_VALVE](VkDescriptorPoolCreateFlagBits.html)

Extending [VkDescriptorSetLayoutCreateFlagBits](VkDescriptorSetLayoutCreateFlagBits.html):

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_VALVE](VkDescriptorSetLayoutCreateFlagBits.html)

Extending [VkDescriptorType](VkDescriptorType.html):

* 
[VK_DESCRIPTOR_TYPE_MUTABLE_VALVE](VkDescriptorType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_MUTABLE_DESCRIPTOR_TYPE_CREATE_INFO_VALVE](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MUTABLE_DESCRIPTOR_TYPE_FEATURES_VALVE](VkStructureType.html)

* 
Revision 1, 2020-12-01 (Joshua Ashton, Hans-Kristian Arntzen)

Initial specification, squashed from public draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_VALVE_mutable_descriptor_type).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
