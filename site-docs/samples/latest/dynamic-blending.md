# Dynamic blending

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/extensions/dynamic_blending/README.html

## Table of Contents

- [Overview](#_overview)
- [How to use in Vulkan](#_how_to_use_in_vulkan)
- [How_to_use_in_Vulkan](#_how_to_use_in_vulkan)
- [The sample](#_the_sample)
- [Documentation links](#_documentation_links)

## Content

This sample demonstrates the functionality of VK_EXT_extended_dynamic_state3 related to blending. It includes the
following features:

* 
`vkCmdSetColorBlendEnableEXT`: toggles blending on and off.

* 
`vkCmdSetColorBlendEquationEXT`: modifies blending operators and factors.

* 
`vkCmdSetColorBlendAdvancedEXT`: utilizes more complex blending operators.

* 
`vkCmdSetColorWriteMaskEXT`: toggles individual channels on and off.

To utilize this feature, the device extension `VK_EXT_EXTENDED_DYNAMIC_STATE_3_EXTENSION_NAME` need to be enabled.
The extension `VK_EXT_BLEND_OPERATION_ADVANCED_EXTENSION_NAME` is required for the advanced blend equations.
All presented functions take an array of objects defining their action for subsequent color attachments:

* 
The `vkCmdSetColorBlendEnableEXT`
function expects an array of booleans to toggle blending.

* 
The `vkCmdSetColorBlendEquationEXT` function expects an array of
`VkColorBlendEquationEXT` objects which determine operators and factors for
color and alpha blending.

* 
The `VkCmdSetColorBlendAdvancedEXT` function expects an array of `VkColorBlendAdvancedEXT` objects, which determine
blending operators and premultiplication for color blending.

* 
The `vkCmdSetColorWriteMaskEXT` function expects an array of
`VkColorComponentFlags` objects. These objects can be created by combining
the desired color bit flags using bitwise oring.

The sample demonstrates how to set up an application to work with this
extension:

* 
Enabling the extension.

* 
Setting parameters for the presented methods.

The sample demonstrates how the use of each operator affects color blending.

[https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetColorBlendEnableEXT.html](https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetColorBlendEnableEXT.html)

[https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetColorBlendEquationEXT.html](https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetColorBlendEquationEXT.html)

[https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetColorBlendAdvancedEXT.html](https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetColorBlendAdvancedEXT.html)

[https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetColorWriteMaskEXT.html](https://registry.khronos.org/vulkan/specs/latest/man/html/vkCmdSetColorWriteMaskEXT.html)
