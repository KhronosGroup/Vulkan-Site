# VK_KHR_shader_integer_dot_product(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_shader_integer_dot_product.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_shader_integer_dot_product](#VK_KHR_shader_integer_dot_product)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_shader_integer_dot_product - device extension

**Name String**

`VK_KHR_shader_integer_dot_product`

**Extension Type**

Device extension

**Registered Extension Number**

281

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**SPIR-V Dependencies**

* 
[SPV_KHR_integer_dot_product](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_integer_dot_product.html)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Contact**

* 
Kevin Petit [kpet](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_shader_integer_dot_product] @kpet%0A*Here describe the issue or question you have about the VK_KHR_shader_integer_dot_product extension*)

**Extension Proposal**

[VK_KHR_shader_integer_dot_product](../../../../features/latest/features/proposals/VK_KHR_shader_integer_dot_product.html)

**Last Modified Date**

2021-06-16

**Interactions and External Dependencies**

* 
This extension interacts with `[VK_KHR_shader_float16_int8](VK_KHR_shader_float16_int8.html)`.

**IP Status**

No known IP claims.

**Contributors**

* 
Kévin Petit, Arm Ltd.

* 
Jeff Bolz, NVidia

* 
Spencer Fricke, Samsung

* 
Jesse Hall, Google

* 
John Kessenich, Google

* 
Graeme Leese, Broadcom

* 
Einar Hov, Arm Ltd.

* 
Stuart Brady, Arm Ltd.

* 
Pablo Cascon, Arm Ltd.

* 
Tobias Hector, AMD

* 
Jeff Leger, Qualcomm

* 
Ruihao Zhang, Qualcomm

* 
Pierre Boudier, NVidia

* 
Jon Leech, The Khronos Group

* 
Tom Olson, Arm Ltd.

This extension adds support for the integer dot product SPIR-V instructions
defined in SPV_KHR_integer_dot_product.
These instructions are particularly useful for neural network inference and
training but find uses in other general-purpose compute applications as
well.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceShaderIntegerDotProductFeaturesKHR](VkPhysicalDeviceShaderIntegerDotProductFeatures.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceShaderIntegerDotProductPropertiesKHR](VkPhysicalDeviceShaderIntegerDotProductProperties.html)

* 
`VK_KHR_SHADER_INTEGER_DOT_PRODUCT_EXTENSION_NAME`

* 
`VK_KHR_SHADER_INTEGER_DOT_PRODUCT_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INTEGER_DOT_PRODUCT_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INTEGER_DOT_PRODUCT_PROPERTIES_KHR](VkStructureType.html)

Vulkan APIs in this extension are included in core Vulkan 1.3, with the KHR
suffix omitted.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

* 
[    `DotProductInputAllKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-DotProductInputAll)

* 
[    `DotProductInput4x8BitKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-DotProductInput4x8Bit)

* 
[    `DotProductInput4x8BitPackedKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-DotProductInput4x8BitPacked)

* 
[`DotProductKHR`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-DotProduct)

* 
Revision 1, 2021-06-16 (Kévin Petit)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_shader_integer_dot_product).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
