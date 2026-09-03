# Compute Validation and GPU-Assisted Debugging

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_Vulkan_Compute/11_Diagnostics_and_Refinement/02_compute_validation.html

## Table of Contents

- [GPU-AV](#_gpu_av)
- [Enabling GPU-AV in C++](#_enabling_gpu_av_in_c)
- [Enabling_GPU-AV_in_C++](#_enabling_gpu_av_in_c)
- [What GPU-AV Detects](#_what_gpu_av_detects)
- [What_GPU-AV_Detects](#_what_gpu_av_detects)
- [Shader Printf: Seeing Inside the Kernel](#_shader_printf_seeing_inside_the_kernel)
- [Shader_Printf:_Seeing_Inside_the_Kernel](#_shader_printf_seeing_inside_the_kernel)
- [In the Shader (Slang)](#_in_the_shader_slang)
- [In_the_Shader_(Slang)](#_in_the_shader_slang)
- [In the Host Code](#_in_the_host_code)
- [In_the_Host_Code](#_in_the_host_code)
- [Interpreting the Output](#_interpreting_the_output)
- [Interpreting_the_Output](#_interpreting_the_output)

## Content

Debugging a compute shader is notoriously difficult. Unlike CPU code, you can’t easily set a breakpoint or step through your logic line by line. Most errors—like an out-of-bounds buffer access—will simply result in garbage data or, in the worst-case scenario, a "Device Lost" error that provides almost no information about what went wrong.

This is where **GPU-AV** (GPU-Assisted Validation) comes in. Part of the standard Vulkan Validation Layers, GPU-AV works by injecting small amounts of diagnostic code directly into your shaders at runtime. This **instrumentation** allows the layers to track and report errors that would otherwise be invisible.

GPU-AV can also be enabled without code changes using **Vulkan Configurator** (`vkconfig`), the GUI tool distributed with the Vulkan SDK. Alternatively, configure it programmatically by passing a `vk::ValidationFeaturesEXT` structure when creating your Vulkan instance:

// Enabling GPU-AV via ValidationFeaturesEXT
std::vector enabledFeatures = {
    vk::ValidationFeatureEnableEXT::eGpuAssisted,
    vk::ValidationFeatureEnableEXT::eGpuAssistedReserveBindingSlot
};

vk::ValidationFeaturesEXT validationFeatures {
    .enabledValidationFeatureCount = static_cast(enabledFeatures.size()),
    .pEnabledValidationFeatures = enabledFeatures.data()
};

vk::InstanceCreateInfo createInfo {
    .pNext = &validationFeatures,
    // ... other setup ...
};

* 
**Out-of-Bounds Access**: If you try to read from `data[100]` when the buffer only has 50 elements, GPU-AV will catch it.

* 
**Invalid Pointers**: When using **Buffer Device Address (BDA)**, GPU-AV can detect if you’re dereferencing a null or invalid pointer.

* 
**Uninitialized Descriptors**: It ensures that every descriptor your shader touches has been correctly bound and initialized.

While GPU-AV is great for catching errors, sometimes you just need to see the values of your variables. This is where `debugPrintfEXT` (from the `GL_EXT_debug_printf` extension) becomes your best friend.

Slang supports `printf` directly, which maps to the underlying Vulkan extension.

// Using printf in a compute shader
void computeMain(uint3 globalID : SV_DispatchThreadID) {
    float some_value = calculate_complex_math(globalID.x);

    if (some_value 

To see the output from `printf`, you **must**

Enable the `VK_KHR_shader_non_semantic_info` extension on your device.

Have a standard **Debug Messenger** callback registered. The output from your shader will arrive as a `VkDebugUtilsMessengerCallbackDataEXT` with a message ID that identifies it as a printf call.

When a validation error or a `printf` occurs, the output can be verbose. Look for:

* 
**The Shader Module**: Which shader triggered the message.

* 
**The Instruction Offset**: The specific SPIR-V instruction that failed.

* 
**The Value**: For `printf`, this is your formatted string. For GPU-AV, it might be the invalid index or pointer address.

While GPU-AV and `printf` have a significant performance cost, they are indispensable for development. They turn the "black box" of the GPU into a transparent environment where you can build complex, reliable compute pipelines with confidence.

[Previous: Introduction](01_introduction.html) | [Next: AI-Assisted Optimization](03_assistant_led_optimization.html)
