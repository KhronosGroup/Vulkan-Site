# Hardware & VRAM Budgeting

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/03_model_selection_specialization/03_hardware_vram.html

## Table of Contents

- [VRAM is a shared resource](#_vram_is_a_shared_resource)
- [VRAM_is_a_shared_resource](#_vram_is_a_shared_resource)
- [VRAM contention and swapping to system RAM](#_vram_contention_and_swapping_to_system_ram)
- [VRAM_contention_and_swapping_to_system_RAM](#_vram_contention_and_swapping_to_system_ram)
- [Calculating your actual budget](#_calculating_your_actual_budget)
- [Calculating_your_actual_budget](#_calculating_your_actual_budget)
- [Quantization](#_quantization)
- [Quantizing a model yourself](#_quantizing_a_model_yourself)
- [Quantizing_a_model_yourself](#_quantizing_a_model_yourself)
- [If VRAM is still tight](#_if_vram_is_still_tight)
- [If_VRAM_is_still_tight](#_if_vram_is_still_tight)
- [Summary](#_summary)

## Content

Once you introduce a local AI assistant, you’re no longer only competing with other applications for CPU time — you’re competing with your own engine for VRAM. Treating this seriously means working out a budget rather than assuming things will fit.

VRAM isn’t a static bucket you fill once. With a local model running, your GPU is regularly switching between two demanding workloads:

**The LLM inference engine**, holding the model’s weights in memory to generate output.

**The Vulkan application**, holding textures, buffers, and render targets.

If the combined requirement exceeds your physical VRAM, the OS starts moving AI weights or Vulkan resources into much slower system RAM. This is bad for both sides: token generation can drop from ~50/s to single digits, and your application’s frame rate can fall into the single digits too.

The model-size number on a download page isn’t the whole picture — you also need to account for the KV cache, the model’s short-term memory for the current conversation.

Total VRAM - (OS/Desktop + Vulkan Peak + (Model Size * Quantization) + KV Cache) = Safety Margin

* 
**OS/Desktop:** typically 1.5–2GB on Windows/Linux.

* 
**Vulkan peak:** the maximum VRAM your engine uses during a heavy debug session.

* 
**Model size × quantization:** a 30B model (e.g. Qwen 3-Coder) at 4-bit (Q4_K_M) is roughly 18GB; a 12B model (e.g. Mistral-Nemo) is roughly 8GB.

* 
**KV cache:** easy to overlook. At a 16k context window, this can add another 1–2GB.

**Example: a 24GB card.** On an RTX 4090 (24GB), with 6GB going to OS + Vulkan app and 18GB to Qwen 3-Coder (30B) at Q4_K_M, that’s `24 - (6 + 18) = 0GB` of margin. Any long conversation that grows the KV cache will push you into swapping. The fix is either a smaller model (Mistral-Nemo 12B or Llama 4 17B) or reducing the context window to something like 4,096 tokens to free up that 1–2GB.

Running a model at full precision (FP16) usually isn’t necessary. Quantization reduces the bits used per weight — similar in spirit to texture compression (BC7, ASTC): you trade some precision for a large reduction in memory.

4-bit (Q4_K_M) or 5-bit (Q5_K_M) is a reasonable default. At 4-bit, size drops by about 75% while reasoning ability on C++ code stays close to its original level. Going below 4-bit (e.g. 2-bit) tends to cause real degradation — the model starts making mistakes on the finer details of Vulkan’s state machine because the weights no longer encode them precisely enough.

Most people download pre-quantized models from HuggingFace, but it’s worth knowing how to do this yourself so you can take a freshly released FP16 model and fit it to your hardware.

The main tool is **llama.cpp**:

**Clone and build:**

git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp
make -j  # Builds the quantize and convert binaries

**Convert to GGUF.** Most models ship in HuggingFace `SafeTensors` format and need converting to GGUF for local inference:

python3 convert_hf_to_gguf.py models/my_vulkan_model/

**Quantize.** `Q4_K_M` is a reasonable balance of speed and accuracy:

./quantize models/my_vulkan_model/model-f16.gguf models/my_vulkan_model/model-Q4_K_M.gguf Q4_K_M

**Verify.** A 32GB FP16 model should come out to roughly 18GB. Load it into Ollama or LM Studio and check the VRAM headroom for your swapchain.

A few concrete options if your hardware is limited:

**Limit the context window.** Set `context_length` to something like 8192 in Ollama/LM Studio — usually enough for a few files of Vulkan code, and it saves 1.5GB or so versus the default.

**Offload layers to CPU.** With GGUF, you can move some layers off the GPU — e.g. 10 of 60 layers — trading roughly 20% inference speed for a few GB of VRAM back.

**Use a second GPU.** If you have a spare 8–12GB card, put it in a second PCIe slot and point Ollama at it exclusively, keeping your primary GPU dedicated to the Vulkan application.

Hardware budgeting is the unglamorous part of running a local AI setup, but understanding your VRAM footprint — and actively managing the KV cache and quantization — is what keeps the assistant from competing with your renderer for memory.

Next: [MCP & RAG Specialization](04_rag_mcp_specialization.html)
